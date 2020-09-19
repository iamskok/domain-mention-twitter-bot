import Twit from 'twit';
import dotenv from 'dotenv';
import path from 'path';
import twitAuth from '../config/twit-auth.js';

dotenv.config({ path: `${path.resolve()}/.env` });

// Used for `search/*` endpoints.
const twitUserAuth = new Twit({
  ...twitAuth,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
});

export default twitUserAuth;
