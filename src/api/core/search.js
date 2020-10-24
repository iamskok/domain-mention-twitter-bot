import setTweet from '../firestore/set-tweet';
import readSearchTweets from '../twitter/read-search-tweets';
import logger from '../../services/logger';

const search = (domainName) => {
  logger.log('info', '>>>> Enter `core/search`');

  readSearchTweets(domainName, setTweet);

  logger.log('info', '>>>> Exit `core/search`');
};

export default search;
