import twitUserAuth from '../../services/twit-user-auth.js';
import getPostTitle from '../../utils/get-post-title.js';

// Find all personal tweets mentioning `domainName` via `statuses/user_timeline` endpoint.
const readUserTimelineTweets = (domainName, setTweet) => {
  twitUserAuth.get(
    'statuses/user_timeline',
    {
      count: 200,
    },
    (error, data, response) => {
      if (error) {
        if (error) {
          // Handle "Rate limit exceeded." error. Error code 88.
          if (error.message.toLowerCase().includes('rate limit exceeded')) {
            setTimeout(async () => {
              readUserTimelineTweets(domainName, setTweet);
            }, 15 * 60 * 1000);
          } else {
            throw new Error(error);
          }
        }
      } else if (response.statusCode === 200) {
        data.forEach((tweet) => {
          tweet.entities.urls.forEach(async ({ expanded_url: url }) => {
            if (url.includes(domainName)) {
              const postTitle = getPostTitle(url);

              if (postTitle) {
                await setTweet(postTitle, tweet);
              }
            }
          });
        });
      }
    },
  );
};

export default readUserTimelineTweets;
