import twitUserAuth from '../../services/twit-user-auth.js';
import dedupeTweets from '../../utils/dedupe-tweets.js';
import tweetURL from '../../utils/tweet-url.js';

// Search tweet replies or quotes with nested replies/quotes
const searchTweetResponses = (tweet, tweetType, oldResponses) => {
  const responsesPromise = new Promise((resolve, reject) => {
    const userName = tweet.user.screen_name;
    const tweetId = tweet.id_str;
    const isReply = tweetType === 'reply';

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
            setTimeout(async () => {
              resolve(await searchTweetResponses(tweet, tweetType, oldResponses));
            }, 15 * 60 * 1000);
          } else {
            reject(error);
          }
        } else if (response.statusCode === 200) {
          // Filter new responses by quotes or replies.
          const newResponses = isReply
            ? data.statuses.filter((reply) => reply.in_reply_to_status_id_str === tweetId)
            : data.statuses.filter((quote) => quote.quoted_status_id_str === tweetId);

          // All replies or quotes of the current tweet (includes nested replies and quotes).
          const responses = dedupeTweets(oldResponses, newResponses);

          // All transformed replies or quotes of the current tweet.
          const updatedResponses = [];
          const childRepliesPromises = [];
          const childQuotesPromises = [];

          for (let i = 0; i < responses.length; i += 1) {
            const childTweet = responses[i];

            // Create an array of child replies promises.
            childRepliesPromises.push(new Promise((_resolve) => {
              const childReplies = childTweet.replies || [];

              // Search for all replies of the child tweet.
              _resolve(searchTweetResponses(childTweet, 'reply', childReplies));
            }));

            // Create an array of child quotes promises.
            childQuotesPromises.push(new Promise((_resolve) => {
              const childQuotes = childTweet.quotes || [];

              // Search for all quotes of the child tweet.
              _resolve(searchTweetResponses(childTweet, 'quote', childQuotes));
            }));
          }

          const childReplies = await Promise.all(childRepliesPromises);
          const childQuotes = await Promise.all(childQuotesPromises);

          // Compose child tweet with replies and quotes.
          for (let i = 0; i < responses.length; i += 1) {
            const childTweet = responses[i];

            childTweet.replies = childReplies[i];
            childTweet.quotes = childQuotes[i];

            updatedResponses.push(childTweet);
          }

          resolve(updatedResponses);
        }
      },
    );
  });

  return responsesPromise;
};

export default searchTweetResponses;
