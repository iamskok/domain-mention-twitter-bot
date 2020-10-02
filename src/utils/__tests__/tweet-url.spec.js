import tweetURL from '../tweet-url';

describe('tweetURL utility', () => {
  it('returns tweet URL from a tweet', () => {
    const tweet = {
      id_str: '1212796539350831104',
      user: {
        screen_name: 'iamskok',
      },
    };

    expect(tweetURL(tweet)).toBe('https://twitter.com/iamskok/status/1212796539350831104');
  });
});
