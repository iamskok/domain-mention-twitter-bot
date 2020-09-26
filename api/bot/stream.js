import setTweet from '../firestore/set-tweet.js';
import readStreamTweets from '../twitter/read-stream-tweets.js';
import logger from '../../services/logger.js';

const stream = (domainName) => {
  logger.log('info', '>>>> Enter `bot/stream`');

  readStreamTweets(domainName, setTweet)
    .catch((error) => {
      logger.log('error', '`bot/stream`', {
        errorObject: error,
      });
    }).finally(() => {
      logger.log('info', '>>>> Exit `bot/stream`');
    });
};

export default stream;
