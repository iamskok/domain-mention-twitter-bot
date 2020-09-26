import twitUserAuth from '../../services/twit-user-auth.js';
import getPostTitle from '../../utils/get-post-title.js';
import logger from '../../services/logger.js';

// Find all personal tweets mentioning `domainName` via `statuses/user_timeline` endpoint.
const readUserTimelineTweets = (domainName, setTweet) => {
  logger.log('info', '>>>> Enter readUserTimelineTweets');

  twitUserAuth.get(
    'statuses/user_timeline',
    {
      count: 200,
    },
    (error, data, response) => {
      if (error) {
        // Handle "Rate limit exceeded." error. Error code 88.
        if (error.message.toLowerCase().includes('rate limit exceeded')) {
          logger.log('info', 'Twitter API returned `Rate limit exceeded` error');
          logger.log('verbose', 'Wait for 15mins before calling readUserTimelineTweets()');

          setTimeout(async () => {
            logger.log('verbose', 'Call readUserTimelineTweets again after 15mins wait');

            readUserTimelineTweets(domainName, setTweet);
          }, 15 * 60 * 1000);
        } else {
          logger.log('error', 'Error in readUserTimelineTweets => twitUserAuth.get()', error);

          throw new Error(error);
        }
      } else if (response.statusCode === 200) {
        logger.log('debug', 'Twitter API returned status code 200');

        data.forEach((tweet) => {
          tweet.entities.urls.forEach(async ({ expanded_url: url }) => {
            if (url.includes(domainName)) {
              logger.log('debug', `Tweet includes ${domainName} URL`);

              const postTitle = getPostTitle(url);
              logger.log('debug', `Tweet relates to ${postTitle} blog post`);

              if (postTitle) {
                await setTweet(postTitle, tweet);

                logger.log('debug', `Add tweet to ${postTitle} document`);
              }
            }
          });
        });
      }
    },
  );

  logger.log('info', '>>>> Exit readUserTimelineTweets');
};

export default readUserTimelineTweets;
