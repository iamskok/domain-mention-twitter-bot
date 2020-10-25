import limiter from 'limiter';
import rateLimitedTwitterRequest from '../rate-limited-twitter-request';

const { RateLimiter } = limiter;

const TWITTER_SEARCH_RATE_LIMIT_PER_WINDOW = 3;
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

  it('returns response in more than a second when called 4 times in 3 seconds', (done) => {
    const promises = [];

    for (let i = 0; i < 4; i += 1) {
      promises.push(
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
      );
    }

    const t1 = Date.now();

    Promise.all(promises).then(() => {
      const t2 = Date.now();

      expect(t2 - t1).toBeGreaterThanOrEqual(1000);
      done();
    });
  });

  it('returns response in less than a second when called 3 times in 3 seconds', (done) => {
    const promises = [];

    for (let i = 0; i < 3; i += 1) {
      promises.push(
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
      );
    }

    const t1 = Date.now();

    Promise.all(promises).then(() => {
      const t2 = Date.now();

      expect(t2 - t1).toBeLessThanOrEqual(1000);
      done();
    });
  });
});
