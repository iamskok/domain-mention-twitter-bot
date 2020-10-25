import limiter from 'limiter';
import rateLimitedTwitterRequest from '../rate-limited-twitter-request';
// import twitUserAuth from '../../../services/twit-user-auth';

const { RateLimiter } = limiter;
const TWITTER_SEARCH_RATE_LIMIT_PER_WINDOW = 1;

const twitterLimiter = new RateLimiter(TWITTER_SEARCH_RATE_LIMIT_PER_WINDOW, 'second');

const twitUserAuthFactory = (twitError, data, response) => ({
  get(endpoint, options, callback) {
    callback(twitError, data, response);
  },
});

describe('rateLimitedTwitterRequest', () => {
  it('returns rejected promise when `twitError` exists', async () => {
    await expect(
      rateLimitedTwitterRequest(
        'search/tweets',
        {},
        twitUserAuthFactory(
          {
            error: 'Twit error',
          },
          {},
          {},
        ),
        twitterLimiter,
      ),
    ).rejects.toEqual({
      error: 'Twit error',
    });
  });

  it('returns rejected promise when status code is not 200', async () => {
    await expect(
      rateLimitedTwitterRequest(
        'search/tweets',
        {},
        twitUserAuthFactory(
          {
            error: 'Status code is not 200',
          },
          {},
          {
            statusCode: 400,
          },
        ),
        twitterLimiter,
      ),
    ).rejects.toEqual({
      error: 'Status code is not 200',
    });
  });

  it('returns resolved promise when there is no Twit error and status code is 200', async () => {
    await expect(
      rateLimitedTwitterRequest(
        'search/tweets',
        {},
        twitUserAuthFactory(
          false,
          {},
          {
            statusCode: 200,
          },
        ),
        twitterLimiter,
      ),
    ).resolves.toEqual({});
  });
});
