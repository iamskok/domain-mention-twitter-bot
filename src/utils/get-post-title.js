// Extract post title from a URL of a valid format.
// format - https://example.com/blog/post-title.
const getPostTitle = (url, base = 'blog') => {
  const { pathname } = new URL(url);
  const slashRegex = new RegExp('/', 'g');

  // Check if the URL:
  // 1. does not consist of shashes.
  // 2. starts with `/blog/`.
  // 3. pathname is two levels deep.
  if (
    pathname.replace(slashRegex, '')
    && pathname.split(`/${base}/`)[1]
      ?.split('/')
      .filter(Boolean).length === 1
    && pathname.startsWith(`/${base}/`)
  ) {
    return pathname.split(`/${base}/`)[1].replace(slashRegex, '');
  }

  return null;
};

export default getPostTitle;
