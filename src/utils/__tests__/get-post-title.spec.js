import getPostTitle from '../get-post-title';
import domain from '../../tests/options/getPostTitle';

describe('getPostTitle utility', () => {
  it('returns post title from a URL which includes `/blog/` pathname', () => {
    expect(getPostTitle(`${domain}/blog/react`))
      .toBe('react');
  });

  it('returns post title from a URL which ends with a `/`', () => {
    expect(getPostTitle(`${domain}/blog/javascript/`))
      .toBe('javascript');
  });

  it('returns post title from a URL which includes multiple instances of the word `blog` in pathname', () => {
    expect(getPostTitle(`${domain}/blog/blog-creation/`))
      .toBe('blog-creation');
  });

  it('returns post title from a URL which has multiple `/` after `blog`', () => {
    expect(getPostTitle(`${domain}/blog//serverless/`))
      .toBe('serverless');
  });

  it('returns `null` if the URL does not include anything besides `/blog/` in the pathname', () => {
    expect(getPostTitle(`${domain}/blog/`))
      .toBe(null);
  });

  it('returns `null` if the URL pathname has more than 2 levels', () => {
    expect(getPostTitle(`${domain}/blog/favorites/javascript/`))
      .toBe(null);
  });

  it('returns `null` if the URL pathname is `/`', () => {
    expect(getPostTitle(`${domain}`)).toBe(null);
  });

  it('returns `null` if the URL does not have pathname and ends with `/`', () => {
    expect(getPostTitle(`${domain}/`)).toBe(null);
  });

  it('returns `null` if the URL\'s pathname starts with `/blog`', () => {
    expect(getPostTitle(`${domain}/blog`)).toBe(null);
  });
});
