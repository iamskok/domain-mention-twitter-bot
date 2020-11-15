import rateLimiter from '../../services/limiter';
import logger from '../../services/logger';

const rateLimitedTwitterRequest = (
  endpoint,
  options,
  twitAuth,
  limiter = rateLimiter,
) => new Promise((resolve, reject) => {
  limiter.removeTokens(1, (error, remainingRequests) => {
    logger.log('verbose', `twitter/rateLimitedTwitterRequest remaining requests: ${remainingRequests}`);

    if (error) {
      logger.log('error', '`twitter/rateLimitedTwitterRequest` limiter', {
        errorObject: error,
      });

      reject(error);
    } else {
      twitAuth.get(endpoint, options, async (twitError, data, response) => {
        if (twitError) {
          logger.log('error', '`twitter/rateLimitedTwitterRequest` received error from `twitAuth.get`', {
            errorObject: twitError.message,
          });

          return reject(twitError);
        }

        if (response.statusCode !== 200) {
          logger.log('error', '`twitter/rateLimitedTwitterRequest` `twitAuth.get` received non 200 response status code', {
            errorObject: error.message,
          });

          return reject(twitError);
        }

        return resolve(data);
      });
    }
  });
});

export { rateLimitedTwitterRequest };
