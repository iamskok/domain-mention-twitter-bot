import twitAppAuth from '../../services/twit-app-auth';
import getPostTitle from '../../utils/get-post-title';
import tweetURL from '../../utils/tweet-url';
import logger from '../../services/logger';
import { rateLimitedTwitterRequest } from './rate-limited-twitter-request';

// Find tweets thru `search/tweets` endpoint, which mention `domainName`.
const readSearchTweets = (domainName, setTweet) => {
  logger.log('info', '>>>> Enter `twitter/readSearchTweets`');

  rateLimitedTwitterRequest(
    'search/tweets',
    {
      q: `url:${domainName}`,
      count: 100,
    },
    twitAppAuth,
  ).then((data) => {
    logger.log('debug', '`twitter/readSearchTweets` call `twitAppAuth.get()` with', {
      endpoint: 'search/tweets',
      options: {
        q: `url:${domainName}`,
        count: 100,
      },
    });

    data.statuses.forEach((tweet) => {
      tweet.entities.urls.forEach(async ({ expanded_url: url }) => {
        if (url.includes(domainName)) {
          logger.log('verbose', `twitter/readSearchTweets found tweet ${tweetURL(tweet)} which satisfies search criteria`);

          const postTitle = getPostTitle(url);

          if (postTitle) {
            await setTweet(postTitle, tweet);
          }
        }
      });
    });
  });

  logger.log('info', '>>>> Exit `twitter/readSearchTweets`');
};

export default readSearchTweets;
