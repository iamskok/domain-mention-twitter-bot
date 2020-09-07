import Twit from 'twit';
import dotenv from 'dotenv';
import path from 'path';
import genericTweeterAuth from './generic-tweeter-auth.js';

dotenv.config({ path: `${path.resolve()}/.env` });

// Used for `search/tweets` endpoint for a greater request limit.
const twitAppAuth = new Twit({
  ...genericTweeterAuth,
  app_only_auth: true,
});

export default twitAppAuth;
