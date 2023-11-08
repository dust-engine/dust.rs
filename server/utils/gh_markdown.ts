export function StripGithubMarkdownFrontmatter(str: string): string {
  if (/^\s*<!--\s+---\r?\n/.test(str)) {
    // We actually comment out the frontmatter on GitHub so that it doesn't get rendered on GitHub.
    // An example GitHub front matter looks like this:
    // <!--
    // ---
    // title: 'Title of the page'
    // description: 'meta description of the page'
    // ---
    // -->
    // Here, we remove the comment signs <!-- xxxxxx -->.
    str = str.replace(/^\s*<!--\s+---\r?\n/, '---\n');
    str = str.replace(/\r?\n---\s+-->/, '\n---\n');
  }
  return str;
}