import setTweet from '../firestore/set-tweet.js';
import readSearchTweets from '../twitter/read-search-tweets.js';
import logger from '../../services/logger.js';

const search = (domainName) => {
  logger.log('info', '>>>> Enter `bot/search`');

  readSearchTweets(domainName, setTweet)
    .catch((error) => {
      logger.log('error', '`bot/search`', {
        errorObject: error,
      });
    }).finally(() => {
      logger.log('info', '>>>> Exit `bot/search`');
    });
};

export default search;
