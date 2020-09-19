import Twit from 'twit';
import dotenv from 'dotenv';
import path from 'path';
import twitAuth from '../config/twit-auth.js';

dotenv.config({ path: `${path.resolve()}/.env` });

// Used for `search/tweets` endpoint for a greater request limit.
const twitAppAuth = new Twit({
  ...twitAuth,
  app_only_auth: true,
});

export default twitAppAuth;
