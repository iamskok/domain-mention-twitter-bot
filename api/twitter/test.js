import twitUserAuth from '../../services/twit-user-auth.js';
import tweetURL from '../../utils/tweet-url.js';
import logger from '../../services/logger.js';

// Search tweet replies or quotes with nested replies/quotes
const test = (tweet, tweetType, oldResponses, depth = 0) => {
  twitUserAuth.get(
    'search/tweets',
    {
      // Search for all replies to a username or a particular tweet URL.
      // q: 'https://twitter.com/shameermulji/status/1309550586451300353',
      q: 'https://twitter.com/Krewell/status/1309610517766369280',
      count: 100,
      // sinceId: '1309550586451300353',
      sinceId: '1309610517766369280',
    },
    async (error, data, response) => {
      if (error) {
        // Handle "Rate limit exceeded." error. Error code 88.
        if (error.message.toLowerCase().includes('rate limit exceeded')) {
          logger.log('info', 'Twitter API returned `Rate limit exceeded` error');
        } else {
          logger.log('error', {
            endpoint: 'search/tweets',
            // Search for all replies to a username or a particular tweet URL.
            q: isReply ? `to:${userName}` : tweetURL(tweet),
            count: 100,
            sinceId: tweetId,
          });
        }
      } else {
        logger.log('info', 'SUCCESS');
        console.log('data', data);
      }
    },
  );
};

export default test;
