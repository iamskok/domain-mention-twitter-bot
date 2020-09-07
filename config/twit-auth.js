import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: `${path.resolve()}/.env` });

// Generic config used in App and User auth.
const twitAuth = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  timeout_ms: 60 * 1000,
};

export default twitAuth;
