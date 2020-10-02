// Extract post title from a URL of a valid format.
// format - https://example.com/blog/post-title.
const getPostTitle = (url, base = 'blog') => {
  const { pathname } = new URL(url);

  // Check if the URL starts with `/blog/` and the pathname is two levels deep.
  if (
    pathname.split(`/${base}/`)[1]
      .split('/')
      .filter(Boolean).length === 1
    && pathname.startsWith(`/${base}/`)
  ) {
    const slashRegex = new RegExp('/', 'g');

    return pathname.split(`/${base}/`)[1].replace(slashRegex, '');
  }

  return null;
};

export default getPostTitle;
