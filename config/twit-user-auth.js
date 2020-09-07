import Twit from 'twit';
import dotenv from 'dotenv';
import path from 'path';
import genericTweeterAuth from './generic-tweeter-auth.js';

dotenv.config({ path: `${path.resolve()}/.env` });

// Used for `search/*` endpoints.
const twitUserAuth = new Twit({
  ...genericTweeterAuth,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

export default twitUserAuth;
