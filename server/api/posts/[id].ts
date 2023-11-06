import { githubRequest } from '~/server/utils/gh_gql';
import markdownTransformer from '@nuxt/content/transformers/markdown';
const GetQuery = (owner: string, repo: string) => `
query DustGetPost($id: Int!) {
  repository(owner: "${owner}", name: "${repo}") {
    discussion(number: $id) {
      id
      category {
        id
      }
      author {
        avatarUrl
        url
        login
      }
      authorAssociation
      title
      body
      url
      createdAt
      updatedAt
    }
  }
}
`;

type Discussion = {
  id: string,
  author: {
    avatarUrl: string,
    url: string,
    login: string,
  },
  authorAssociation: string,
  title: string,
  url: string,
  body: any,
  createdAt: string,
  updatedAt: string,
}
export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id')!);
  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID should be an integer',
    })
  }

  setResponseHeader(event, 'Cache-Control', 'public, max-age=3600');
  const config = useRuntimeConfig();
  const responseBody = await githubRequest(
    GetQuery(config.githubDiscussion.orgName, config.githubDiscussion.repoName),
    'DustGetPost',
    { id }
  );
  const discussion = responseBody?.repository?.discussion as Discussion & { category: { id: string } | undefined};
  if (!discussion || discussion.category!.id !== 'DIC_kwDOFJwmwM4CXtBX') {
    throw createError({
      statusCode: 404,
      statusMessage: 'Discussion does not exist.',
    })
  }
  delete discussion.category;
  
  
  setResponseHeader(event, 'Last-Modified', (new Date(discussion.updatedAt || discussion.createdAt)).toUTCString());

  const contentId = 'post-' + id;
  if (/^\s*<!--\s+---\r?\n/.test(discussion.body)) {
    // We actually comment out the frontmatter on GitHub so that it doesn't get rendered on GitHub.
    // An example GitHub front matter looks like this:
    // <!--
    // ---
    // title: 'Title of the page'
    // description: 'meta description of the page'
    // ---
    // -->
    // Here, we remove the comment signs <!-- xxxxxx -->.
    discussion.body = discussion.body.replace(/^\s*<!--\s+---\r?\n/, '---\n');
    discussion.body = discussion.body.replace(/\r?\n---\s+-->/, '\n---\n');
  }
  const parsedBody = await markdownTransformer.parse!(contentId, discussion.body, {});
  for (const key of ['title', 'description', 'excerpt']) {
    if (!parsedBody[key]) {
      delete parsedBody[key]
    }
  }
  return {
    ...discussion,
    ...parsedBody,
  };
})
