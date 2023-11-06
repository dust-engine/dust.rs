import { githubRequest } from '~/server/utils/gh_gql';
import markdownTransformer from '@nuxt/content/transformers/markdown';
const GetQuery = (owner: string, repo: string) => `
query DustGetPostList {
  repository(owner: "${owner}", name: "${repo}") {
    discussions(first: 100, categoryId: "DIC_kwDOFJwmwM4CXtBX", orderBy: {field: CREATED_AT, direction: DESC}) {
      nodes {
        id
        author {
          avatarUrl
          url
          login
        }
        authorAssociation
        title
        createdAt
        updatedAt
        number
      }
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
  createdAt: string,
  updatedAt: string,
  number: string,
}
export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Cache-Control', 'public, max-age=3600');
  const config = useRuntimeConfig();
  const responseBody = await githubRequest(
    GetQuery(config.githubDiscussion.orgName, config.githubDiscussion.repoName),
    'DustGetPostList'
  );
  
  const discussions = responseBody.repository.discussions.nodes;
  if (!discussions) {
    throw createError({
        statusCode: 500,
        message: "Unexpected response"
    });
  }
  return discussions;
})
