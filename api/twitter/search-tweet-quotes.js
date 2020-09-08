import twitAppAuth from '../../config/twit-app-auth.js';
import dedupeTweets from '../../utils/dedupe-tweets.js';
import tweetURL from '../../utils/tweet-url.js';

// Search quotes for all tweets that are stored in the DB via `search/tweets` endpoint.
const searchTweetQuotes = async (tweet, oldQuotes) => {
  const userName = tweet.user.screen_name;
  const tweetId = tweet.id_str;

  return new Promise((resolve, reject) => {
    twitAppAuth.get(
      'search/tweets',
      {
        q: tweetURL(userName, tweetId),
        count: 100,
        sinceId: tweetId,
      },
      async (error, data, response) => {
        if (error) {
          reject(error);
        } else if (response.statusCode === 200) {
          const newQuotes = data.statuses.filter((quote) => quote.quoted_status_id_str === tweetId);

          // All quotes of the current tweet (includes current and nested quote).
          const quotes = dedupeTweets(oldQuotes, newQuotes);

          // All transformed quotes of the current tweet.
          const updatedQuotes = [];
          const childQuotesPromises = [];

          for (let i = 0; i < quotes.length; i += 1) {
            childQuotesPromises.push(new Promise((_resolve) => {
              const childTweet = quotes[i];
              const childQuotes = childTweet.quotes || [];

              // Search all quotes of the child tweet.
              _resolve(searchTweetQuotes(childTweet, childQuotes));
            }));
          }

          const childQuotes = await Promise.all(childQuotesPromises);

          // Compose child quotes with tweet quotes.
          for (let i = 0; i < childQuotes.length; i += 1) {
            const childTweet = quotes[i];

            childTweet.quotes = childQuotes[i];
            updatedQuotes.push(childTweet);
          }

          resolve(updatedQuotes);
        }
      },
    );
  });
};

export default searchTweetQuotes;
