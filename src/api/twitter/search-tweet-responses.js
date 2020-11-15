import twitUserAuth from '../../services/twit-user-auth';
import dedupeTweets from '../../utils/dedupe-tweets';
import normalizeTweet from '../../utils/normalize-tweet';
import tweetURL from '../../utils/tweet-url';
import logger from '../../services/logger';
import { rateLimitedTwitterRequest } from './rate-limited-twitter-request';

// Search for tweet replies or quotes with nested replies/quotes
const searchTweetResponses = (tweet, tweetType, oldResponses, recursionDepthLimit, depth = 0) => {
  logger.log('info', '>>>> Enter `twitter/searchTweetResponses`');
  logger.log('debug', 'Call `twitter/searchTweetResponses` with', {
    tweet,
    tweetType,
    oldResponses,
    recursionDepthLimit,
    depth,
  });

  const responsesPromise = new Promise((resolve, reject) => {
    if (depth >= recursionDepthLimit) {
      logger.log('verbose', `'searchTweetResponses' depth limit - ${depth} exceeded recursion depth limit - ${recursionDepthLimit}`);

      resolve(undefined);
      return;
    }

    const userName = tweet.user.screen_name;
    const tweetId = tweet.id_str;
    const isReply = tweetType === 'reply';

    logger.log('verbose', `twitter/searchTweetResponses find tweet ${tweetURL(tweet)} responses`);

    logger.log('debug', '`twitter/searchTweetResponses` call `twitUserAuth.get` with:', {
      endpoint: 'search/tweets',
      options: {
        q: isReply ? `to:${userName}` : tweetURL(tweet),
        count: 100,
        sinceId: tweetId,
      },
    });

    rateLimitedTwitterRequest(
      'search/tweets',
      {
        // Search for all replies to a username or a particular tweet URL.
        q: isReply ? `to:${userName}` : tweetURL(tweet),
        count: 100,
        sinceId: tweetId,
      },
      twitUserAuth,
    ).then(async (data) => {
      logger.log('debug', '`twitter/searchTweetResponses` twitter API returned status code 200');

      // Filter new responses by quotes or replies.
      const newResponses = isReply
        ? data.statuses.filter((reply) => reply.in_reply_to_status_id_str === tweetId)
        : data.statuses.filter((quote) => quote.quoted_status_id_str === tweetId);

      logger.log('debug', '`twitter/searchTweetResponses` filter new responses');

      // All replies or quotes of the current tweet (includes nested replies and quotes).
      const responses = dedupeTweets(oldResponses, newResponses.map(normalizeTweet));

      logger.log('debug', '`twitter/searchTweetResponses` dedupe responses');

      // All transformed replies or quotes of the current tweet.
      const updatedResponses = [];
      const childRepliesPromises = [];
      const childQuotesPromises = [];

      for (let i = 0; i < responses.length; i += 1) {
        logger.log('debug', '`twitter/searchTweetResponses` loop over all responses');

        const childTweet = responses[i];

        // Create an array of child replies promises.
        childRepliesPromises.push(new Promise((childRepliesResolve) => {
          const childReplies = childTweet.replies || [];

          logger.log('debug', '`twitter/searchTweetResponses` search for all child tweet replies. Call `searchTweetResponses` with:', {
            tweet,
            tweetType,
            oldResponses,
            recursionDepthLimit,
            depth: depth + 1,
          });

          // Search for all replies of the child tweet.
          childRepliesResolve(searchTweetResponses(childTweet, 'reply', childReplies, recursionDepthLimit, depth + 1));
        }));

        // Create an array of child quotes promises.
        childQuotesPromises.push(new Promise((childQuotesResolve) => {
          const childQuotes = childTweet.quotes || [];

          logger.log('debug', '`twitter/searchTweetResponses` search for all child tweet quotes. Call `searchTweetResponses` with:', {
            tweet,
            tweetType,
            oldResponses,
            recursionDepthLimit,
            depth: depth + 1,
          });

          // Search for all quotes of the child tweet.
          childQuotesResolve(searchTweetResponses(childTweet, 'quote', childQuotes, recursionDepthLimit, depth + 1));
        }));
      }

      let childReplies = [];

      try {
        childReplies = await Promise.all(childRepliesPromises);
      } catch (childRepliesError) {
        logger.log('error', '`twitter/searchTweetResponses` catch block in `childReplies`', {
          errorObject: childRepliesError,
        });
      }

      logger.log('debug', '`twitter/searchTweetResponses` resolve all `childReplies` promises');

      let childQuotes = [];

      try {
        childQuotes = await Promise.all(childQuotesPromises);
      } catch (childQuotesError) {
        logger.log('error', '`twitter/searchTweetResponses` catch block in `childQuotes`', {
          errorObject: childQuotesError,
        });
      }

      logger.log('debug', '`twitter/searchTweetResponses` resolve all `childQuotes` promises');

      // Compose child tweet with replies and quotes.
      for (let i = 0; i < responses.length; i += 1) {
        logger.log('debug', '`twitter/searchTweetResponses` loop over all responses to compose child tweets with replies and quotes');

        const childTweet = responses[i];

        if (childReplies[i]) {
          childTweet.replies = childReplies[i];

          logger.log('debug', '`twitter/searchTweetResponses` push `childReply` in `childTweet.replies` array', childReplies[i]);
        } else {
          // Handle `undefined` value if `recursionDepthLimit` is exceeded.
          delete childTweet.replies;

          logger.log('debug', '`twitter/searchTweetResponses` delete `childTweet.replies`');
        }

        if (childQuotes[i]) {
          childTweet.quotes = childQuotes[i];

          logger.log('debug', '`twitter/searchTweetResponses` push `childQuote` in `childTweet.quotes` array', childQuotes[i]);
        } else {
          // Handle `undefined` value if `recursionDepthLimit` is exceeded.
          delete childTweet.quotes;

          logger.log('debug', '`twitter/searchTweetResponses` delete `childTweet.quotes`');
        }

        updatedResponses.push(childTweet);

        logger.log('debug', '`twitter/searchTweetResponses` push `childTweet` in `updatedResponses` array');
      }

      resolve(updatedResponses);

      logger.log('debug', '`twitter/searchTweetResponses` resolve `updatedResponses`');
    }).catch(({ message }) => {
      logger.log('error', '`twitter/searchTweetResponses` catch block in `twitUserAuth.get`', {
        endpoint: 'search/tweets',
        options: {
          q: isReply ? `to:${userName}` : tweetURL(tweet),
          count: 100,
          sinceId: tweetId,
        },
      },
      {
        errorObject: message,
      });

      reject(message);
    });
  });

  return responsesPromise;
};

export default searchTweetResponses;
