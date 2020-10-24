import setTweet from '../firestore/set-tweet';
import readStreamTweets from '../twitter/read-stream-tweets';
import logger from '../../services/logger';

const stream = (domainName) => {
  logger.log('info', '>>>> Enter `core/stream`');

  readStreamTweets(domainName, setTweet);

  logger.log('info', '>>>> Exit `core/stream`');
};

export default stream;
