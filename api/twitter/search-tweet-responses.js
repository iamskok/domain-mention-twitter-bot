import twitUserAuth from '../../config/twit-user-auth.js';
import dedupeTweets from '../../utils/dedupe-tweets.js';
import tweetURL from '../../utils/tweet-url.js';
import limiter from '../../config/limiter.js';

const time = () => {
  const date = new Date();
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hour = date.getHours();

  return `${hour}:${minutes}:${seconds}`;
};

// Search tweet replies or quotes with nested replies/quotes
const searchTweetResponses = (tweet, tweetType, oldResponses) => {
  const responsesPromise = new Promise((resolve, reject) => {
    limiter.removeTokens(1, (error, remainingRequests) => {
      const remainingAPIRequests = Math.floor(remainingRequests);

      console.log('remainingAPIRequests:', remainingAPIRequests, time());

      if (remainingAPIRequests < 1) {
        if (error) {
          reject(error);
        } else {
          console.log('WAITING........................', time());

          setTimeout(async () => {
            console.log('RATE LIMIT UPDATED........................', time());

            resolve(await searchTweetResponses(tweet, tweetType, oldResponses));
          }, 15 * 60 * 1000);
        }
      }

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
        async (twitterError, data, response) => {
          if (twitterError) {
            reject(twitterError);
          } else if (response.statusCode === 200) {
            // Filter new responses by quotes or replies.
            const newResponses = isReply
              ? data.statuses.filter(
                (reply) => reply.in_reply_to_status_id_str === tweetId,
              )
              : data.statuses.filter((quote) => quote.quoted_status_id_str === tweetId);

            // All replies or quotes of the current tweet (includes nested replies and quotes).
            const responses = dedupeTweets(oldResponses, newResponses);
            responses.map(t => console.log(t.user.screen_name, t.text, time()));

            // All transformed replies or quotes of the current tweet.
            const updatedResponses = [];
            const childRepliesPromises = [];
            const childQuotesPromises = [];

            for (let i = 0; i < responses.length; i += 1) {
              const childTweet = responses[i];

              // Create an array of child replies promises.
              childRepliesPromises.push(new Promise((childRepliesResolve) => {
                const childReplies = childTweet.replies || [];

                // Search for all replies of the child tweet.
                childRepliesResolve(searchTweetResponses(childTweet, 'reply', childReplies));
              }));

              // Create an array of child quotes promises.
              childQuotesPromises.push(new Promise((childQuotesResolve) => {
                const childQuotes = childTweet.quotes || [];

                // Search for all quotes of the child tweet.
                childQuotesResolve(searchTweetResponses(childTweet, 'quote', childQuotes));
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
  });

  return responsesPromise;
};

export default searchTweetResponses;
