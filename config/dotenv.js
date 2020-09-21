import dotenv from 'dotenv';
import fs from 'fs';
import logger from '../services/logger.js';
import envPath from '../constants/env-path.js';

if (fs.existsSync(envPath)) {
  logger.log('info', '`.env` was found.');
} else {
  logger.log('error', '`.env` is not found.');
}

export default dotenv.config({ path: envPath });
