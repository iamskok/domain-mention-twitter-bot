import normalizeTweet from '../normalize-tweet';
import rawTweets from '../../tests/mocks/rawTweets';

describe('normalizeTweet', () => {
  it('returns normalized tweet', () => {
    expect(normalizeTweet(rawTweets[0])).toMatchSnapshot();
  });

  it('returns normalized tweet reply', () => {
    expect(normalizeTweet(rawTweets[1])).toMatchSnapshot();
  });

  it('returns normalized tweet quote', () => {
    expect(normalizeTweet(rawTweets[2])).toMatchSnapshot();
  });
});
