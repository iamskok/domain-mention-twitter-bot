import twitUserAuth from '../../services/twit-user-auth.js';
import dedupeTweets from '../../utils/dedupe-tweets.js';
import tweetURL from '../../utils/tweet-url.js';
import logger from '../../services/logger.js';

const { RECURSION_DEPTH_LIMIT } = process.env;

// Search tweet replies or quotes with nested replies/quotes
const searchTweetResponses = (tweet, tweetType, oldResponses, depth = 0) => {
  logger.info('Call searchTweetResponses()');
  logger.debug('>>>> Entering searchTweetResponses()', {
    tweet,
    tweetType,
    oldResponses,
    depth,
  });

  const responsesPromise = new Promise((resolve, reject) => {
    logger.debug('create responsesPromise');

    if (depth >= RECURSION_DEPTH_LIMIT) {
      logger.debug(`Depth limit - ${depth} exceeded recursion depth limit - ${RECURSION_DEPTH_LIMIT}`);

      resolve(undefined);
      return;
    }

    const userName = tweet.user.screen_name;
    const tweetId = tweet.id_str;
    const isReply = tweetType === 'reply';

    logger.info(`Manipulate https://twitter.com/${userName}/status/${tweetId} tweet`);
    logger.debug(`userName: ${userName}`);
    logger.debug(`tweetId: ${tweetId}`);

    twitUserAuth.get(
      'search/tweets',
      {
        // Search for all replies to a username or a particular tweet URL.
        q: isReply ? `to:${userName}` : tweetURL(userName, tweetId),
        count: 100,
        sinceId: tweetId,
      },
      async (error, data, response) => {
        logger.debug('Call twitUserAuth.get() with', {
          endpoint: 'search/tweets',
          options: {
            q: isReply ? `to:${userName}` : tweetURL(userName, tweetId),
            count: 100,
            sinceId: tweetId,
          },
        });

        if (error) {
          // Handle "Rate limit exceeded." error. Error code 88.
          if (error.message.toLowerCase().includes('rate limit exceeded')) {
            logger.info('Twitter API returned "Rate limit exceeded."');
            logger.debug(`Wait for ${15 * 60 * 1000}ms before calling searchTweetResponses()`);

            setTimeout(async () => {
              logger.debug(`Call searchTweetResponses() after waiting for ${15 * 60 * 1000}ms`);

              resolve(await searchTweetResponses(tweet, tweetType, oldResponses, depth));
            }, 15 * 60 * 1000);
          } else {
            logger.error('Error in twitUserAuth.get()', {
              endpoint: 'search/tweets',
              options: {
                q: isReply ? `to:${userName}` : tweetURL(userName, tweetId),
                count: 100,
                sinceId: tweetId,
              },
            },
            `Error message: ${error}`);

            reject(error);
          }
        } else if (response.statusCode === 200) {
          logger.debug('Twitter API returned status code 200');

          // Filter new responses by quotes or replies.
          const newResponses = isReply
            ? data.statuses.filter((reply) => reply.in_reply_to_status_id_str === tweetId)
            : data.statuses.filter((quote) => quote.quoted_status_id_str === tweetId);

          logger.debug('Filter new responses:', newResponses);

          // All replies or quotes of the current tweet (includes nested replies and quotes).
          const responses = dedupeTweets(oldResponses, newResponses);

          logger.debug('Dedupe responses:', responses);

          // All transformed replies or quotes of the current tweet.
          const updatedResponses = [];
          const childRepliesPromises = [];
          const childQuotesPromises = [];

          for (let i = 0; i < responses.length; i += 1) {
            logger.debug('Loop over responses');

            const childTweet = responses[i];

            logger.debug('childTweet:', childTweet);

            // Create an array of child replies promises.
            childRepliesPromises.push(new Promise((_resolve) => {
              const childReplies = childTweet.replies || [];

              logger.debug('Search for all child tweet replies. Call searchTweetResponses() with', {
                childTweet,
                tweetType: 'reply',
                childReplies,
                depth: depth + 1,
              });

              // Search for all replies of the child tweet.
              _resolve(searchTweetResponses(childTweet, 'reply', childReplies, depth + 1));
            }));

            // Create an array of child quotes promises.
            childQuotesPromises.push(new Promise((_resolve) => {
              const childQuotes = childTweet.quotes || [];

              logger.debug('Search for all child tweet replies. Call searchTweetResponses() with', {
                childTweet,
                tweetType: 'quote',
                childQuotes,
                depth: depth + 1,
              });

              // Search for all quotes of the child tweet.
              _resolve(searchTweetResponses(childTweet, 'quote', childQuotes, depth + 1));
            }));
          }

          const childReplies = await Promise.all(childRepliesPromises);
          const childQuotes = await Promise.all(childQuotesPromises);

          logger.debug('Resolve all childReplies promises', childReplies);
          logger.debug('Resolve all childQuotes promises', childQuotes);

          // Compose child tweet with replies and quotes.
          for (let i = 0; i < responses.length; i += 1) {
            logger.debug('Loop over all responses to compose child tweets with replies and quotes');

            const childTweet = responses[i];

            logger.debug('childTweet:', childTweet);

            if (childReplies[i]) {
              childTweet.replies = childReplies[i];

              logger.debug('Push childReply in childTweet.replies array', {
                childReply: childReplies[i],
              });
            } else {
              // Handle `undefined` value if `RECURSION_DEPTH_LIMIT` is exceeded.
              delete childTweet.replies;

              logger.debug('Delete childTweet.replies');
            }

            if (childQuotes[i]) {
              childTweet.quotes = childQuotes[i];

              logger.debug('Push childQuote in childTweet.quotes array', {
                childReply: childReplies[i],
              });
            } else {
              // Handle `undefined` value if `RECURSION_DEPTH_LIMIT` is exceeded.
              delete childTweet.quotes;

              logger.debug('Delete childTweet.quotes');
            }

            updatedResponses.push(childTweet);

            logger.debug('Push childTweet in updatedResponses array', {
              childTweet,
            });
          }

          resolve(updatedResponses);

          logger.debug('Resolve updatedResponses');
        }
      },
    );
  });

  logger.debug('<<<< Exiting searchTweetResponses()');

  return responsesPromise;
};

export default searchTweetResponses;
