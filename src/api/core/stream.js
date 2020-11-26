import setTweet from '../firestore/set-tweet';
import readStreamTweets from '../twitter/read-stream-tweets';
import logger from '../../services/logger';

const stream = (domainName) => {
  logger.log('info', '>>>> Start `core/stream`');

  readStreamTweets(domainName, setTweet);
};

export default stream;
