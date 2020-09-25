import setTweet from '../firestore/set-tweet.js';
import readStreamTweets from '../twitter/read-stream-tweets.js';

const stream = (domainName) => readStreamTweets(domainName, setTweet);

export default stream;
