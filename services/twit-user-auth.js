import Twit from 'twit';
import dotenv from 'dotenv';
import path from 'path';
import twitAuth from '../config/twit-auth.js';

const { TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET } = process.env;

dotenv.config({ path: `${path.resolve()}/.env` });

// Used for `search/*` endpoints.
const twitUserAuth = new Twit({
  ...twitAuth,
  access_token: TWITTER_ACCESS_TOKEN,
  access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
});

export default twitUserAuth;
