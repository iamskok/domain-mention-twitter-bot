import setTweet from '../firestore/set-tweet';
import readStreamTweets from '../twitter/read-stream-tweets';
import logger from '../../services/logger';

const stream = (domainName) => {
  logger.log('info', '>>>> Enter `bot/stream`');

  readStreamTweets(domainName, setTweet);

  logger.log('info', '>>>> Exit `bot/stream`');
};

export default stream;
