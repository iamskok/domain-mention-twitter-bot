import Twit from 'twit';
import dotenv from 'dotenv';
import path from 'path';
import twitAuth from './twit-auth.js';

dotenv.config({ path: `${path.resolve()}/.env` });

// Used for `search/*` endpoints.
const twitUserAuth = new Twit({
  ...twitAuth,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

export default twitUserAuth;
