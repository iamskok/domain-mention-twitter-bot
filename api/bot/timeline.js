import setTweet from '../firestore/set-tweet.js';
import readUserTimelineTweets from '../twitter/read-user-timeline-tweets.js';
import logger from '../../services/logger.js';

const timeline = (domainName) => {
  logger.log('info', '>>>> Enter `bot/timeline`');

  readUserTimelineTweets(domainName, setTweet);

  logger.log('info', '>>>> Exit `bot/timeline`');
};

export default timeline;
