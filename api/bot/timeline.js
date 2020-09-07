import setTweet from '../firestore/set-tweet.js';
import readUserTimelineTweets from '../twitter/read-user-timeline-tweets.js';

const timeline = (domainName) => readUserTimelineTweets(domainName, setTweet);

export default timeline;
