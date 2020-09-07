import twitAppAuth from '../../config/twit-app-auth.js';
import getPostTitle from '../../utils/get-post-title.js';

// Find tweets mentioning `domainName` via `search/tweets` endpoint.
const readSearchTweets = (domainName, setTweet) => {
  twitAppAuth.get(
    'search/tweets',
    {
      q: `url:${domainName}`,
      count: 100,
    },
    (error, data, response) => {
      if (error) {
        throw new Error(error);
      } else if (response.statusCode === 200) {
        data.statuses.forEach((tweet) => {
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

export default readSearchTweets;
