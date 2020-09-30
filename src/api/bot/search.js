import setTweet from '../firestore/set-tweet';
import readSearchTweets from '../twitter/read-search-tweets';
import logger from '../../services/logger';

const search = (domainName) => {
  logger.log('info', '>>>> Enter `bot/search`');

  readSearchTweets(domainName, setTweet);

  logger.log('info', '>>>> Exit `bot/search`');
};

export default search;
