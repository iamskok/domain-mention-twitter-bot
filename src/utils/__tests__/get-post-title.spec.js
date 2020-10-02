import getPostTitle from '../get-post-title';

describe('getPostTitle utility', () => {
  it('returns post title from a URL which includes `/blog/` pathname', () => {
    expect(getPostTitle('https://example.com/blog/react'))
      .toBe('react');
  });

  it('returns post title from a URL which ends with a `/`', () => {
    expect(getPostTitle('https://example.com/blog/javascript/'))
      .toBe('javascript');
  });

  it('returns post title from a URL which includes multiple instances of the word `blog` in pathname', () => {
    expect(getPostTitle('https://example.com/blog/blog-creation/'))
      .toBe('blog-creation');
  });

  it('returns post title from a URL which has multiple `/` after `blog`', () => {
    expect(getPostTitle('https://example.com/blog//serverless/'))
      .toBe('serverless');
  });

  it('returns `null` if the URL does not include anything besides `/blog/` in the pathname', () => {
    expect(getPostTitle('https://example.com/blog/'))
      .toBe(null);
  });

  it('returns `null` if the URL pathname has more than 2 levels', () => {
    expect(getPostTitle('https://example.com/blog/favorites/javascript/'))
      .toBe(null);
  });
});
