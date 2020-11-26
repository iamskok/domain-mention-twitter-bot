import Twit from 'twit';
import TWIT_TIMEOUT from '../constants/twit';

const {
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_TOKEN_SECRET,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
} = process.env;

// Used for `search/*` endpoints.
const twitUserAuth = new Twit({
  consumer_key: TWITTER_CONSUMER_KEY,
  consumer_secret: TWITTER_CONSUMER_SECRET,
  access_token: TWITTER_ACCESS_TOKEN,
  access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: TWIT_TIMEOUT,
});

export default twitUserAuth;
