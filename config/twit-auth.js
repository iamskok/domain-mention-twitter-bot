import dotenv from 'dotenv';
import path from 'path';

const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } = process.env;

dotenv.config({ path: `${path.resolve()}/.env` });

// Generic config used in App and User auth.
const twitAuth = {
  consumer_key: TWITTER_CONSUMER_KEY,
  consumer_secret: TWITTER_CONSUMER_SECRET,
  timeout_ms: 60 * 1000,
};

export default twitAuth;
