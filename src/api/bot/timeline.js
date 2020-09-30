import setTweet from '../firestore/set-tweet';
import readUserTimelineTweets from '../twitter/read-user-timeline-tweets';
import logger from '../../services/logger';

const timeline = (domainName) => {
  logger.log('info', '>>>> Enter `bot/timeline`');

  readUserTimelineTweets(domainName, setTweet);

  logger.log('info', '>>>> Exit `bot/timeline`');
};

export default timeline;
