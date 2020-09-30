import tweetURL from '../utils/tweet-url';

describe('Tweet URL utility', () => {
  it('Construct tweet URL from tweet', () => {
    const tweet = {
      id_str: '1212796539350831104',
      user: {
        screen_name: 'iamskok',
      },
    };

    expect(tweetURL(tweet)).toEqual('https://twitter.com/iamskok/status/1212796539350831104');
  });
});
