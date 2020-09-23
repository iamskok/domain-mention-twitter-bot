import twitUserAuth from '../../services/twit-user-auth.js';
import dedupeTweets from '../../utils/dedupe-tweets.js';
import tweetURL from '../../utils/tweet-url.js';
import logger from '../../services/logger.js';

const { RECURSION_DEPTH_LIMIT } = process.env;

// Search tweet replies or quotes with nested replies/quotes
const searchTweetResponses = (tweet, tweetType, oldResponses, depth = 0) => {
  logger.log('info', 'Call searchTweetResponses()');
  logger.log('debug', '>>>> Entering searchTweetResponses()', {
    tweet,
    tweetType,
    oldResponses,
    depth,
  });

  const responsesPromise = new Promise((resolve, reject) => {
    logger.log('debug', 'create responsesPromise');

    if (depth >= RECURSION_DEPTH_LIMIT) {
      logger.log('debug', `Depth limit - ${depth} exceeded recursion depth limit - ${RECURSION_DEPTH_LIMIT}`);

      resolve(undefined);
      return;
    }

    const userName = tweet.user.screen_name;
    const tweetId = tweet.id_str;
    const isReply = tweetType === 'reply';

    logger.log('info', `Manipulate https://twitter.com/${userName}/status/${tweetId} tweet`);
    logger.log('debug', `userName: ${userName}`);
    logger.log('debug', `tweetId: ${tweetId}`);

    logger.log('debug', 'Call twitUserAuth.get() with', {
      endpoint: 'search/tweets',
      options: {
        q: isReply ? `to:${userName}` : tweetURL(userName, tweetId),
        count: 100,
        sinceId: tweetId,
      },
    });

    twitUserAuth.get(
      'search/tweets',
      {
        // Search for all replies to a username or a particular tweet URL.
        q: isReply ? `to:${userName}` : tweetURL(userName, tweetId),
        count: 100,
        sinceId: tweetId,
      },
      async (error, data, response) => {
        if (error) {
          // Handle "Rate limit exceeded." error. Error code 88.
          if (error.message.toLowerCase().includes('rate limit exceeded')) {
            logger.log('info', 'Twitter API returned `Rate limit exceeded` error');
            logger.log('debug', `Wait for ${15 * 60 * 1000}ms before calling searchTweetResponses()`);

            setTimeout(async () => {
              logger.log('debug', `Call searchTweetResponses() after waiting for ${15 * 60 * 1000}ms`);

              resolve(await searchTweetResponses(tweet, tweetType, oldResponses, depth));
            }, 15 * 60 * 1000);
          } else {
            logger.log('error', 'Error in twitUserAuth.get()', {
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
          logger.log('debug', 'Twitter API returned status code 200');

          // Filter new responses by quotes or replies.
          const newResponses = isReply
            ? data.statuses.filter((reply) => reply.in_reply_to_status_id_str === tweetId)
            : data.statuses.filter((quote) => quote.quoted_status_id_str === tweetId);

          logger.log('debug', 'Filter new responses');

          // All replies or quotes of the current tweet (includes nested replies and quotes).
          const responses = dedupeTweets(oldResponses, newResponses);

          logger.log('debug', 'Dedupe responses');

          // All transformed replies or quotes of the current tweet.
          const updatedResponses = [];
          const childRepliesPromises = [];
          const childQuotesPromises = [];

          for (let i = 0; i < responses.length; i += 1) {
            logger.log('debug', 'Loop over responses');

            const childTweet = responses[i];

            logger.log('debug', 'Get childTweet');

            // Create an array of child replies promises.
            childRepliesPromises.push(new Promise((_resolve) => {
              const childReplies = childTweet.replies || [];

              logger.log('debug', 'Search for all child tweet replies. Call searchTweetResponses()');

              // Search for all replies of the child tweet.
              _resolve(searchTweetResponses(childTweet, 'reply', childReplies, depth + 1));
            }));

            // Create an array of child quotes promises.
            childQuotesPromises.push(new Promise((_resolve) => {
              const childQuotes = childTweet.quotes || [];

              logger.log('debug', 'Search for all child tweet replies. Call searchTweetResponses()');

              // Search for all quotes of the child tweet.
              _resolve(searchTweetResponses(childTweet, 'quote', childQuotes, depth + 1));
            }));
          }

          const childReplies = await Promise.all(childRepliesPromises);
          const childQuotes = await Promise.all(childQuotesPromises);

          logger.log('debug', 'Resolve all childReplies promises');
          logger.log('debug', 'Resolve all childQuotes promises');

          // Compose child tweet with replies and quotes.
          for (let i = 0; i < responses.length; i += 1) {
            logger.log('debug', 'Loop over all responses to compose child tweets with replies and quotes');

            const childTweet = responses[i];

            logger.log('debug', 'Get childTweet');

            if (childReplies[i]) {
              childTweet.replies = childReplies[i];

              logger.log('debug', 'Push childReply in childTweet.replies array', {
                childReply: childReplies[i],
              });
            } else {
              // Handle `undefined` value if `RECURSION_DEPTH_LIMIT` is exceeded.
              delete childTweet.replies;

              logger.log('debug', 'Delete childTweet.replies');
            }

            if (childQuotes[i]) {
              childTweet.quotes = childQuotes[i];

              logger.log('debug', 'Push childQuote in childTweet.quotes array');
            } else {
              // Handle `undefined` value if `RECURSION_DEPTH_LIMIT` is exceeded.
              delete childTweet.quotes;

              logger.log('debug', 'Delete childTweet.quotes');
            }

            updatedResponses.push(childTweet);

            logger.log('debug', 'Push childTweet in updatedResponses array');
          }

          resolve(updatedResponses);

          logger.log('debug', 'Resolve updatedResponses');
        }
      },
    );
  });

  logger.log('debug', '<<<< Exiting searchTweetResponses()');

  return responsesPromise;
};

export default searchTweetResponses;
