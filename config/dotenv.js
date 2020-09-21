import dotenv from 'dotenv';
import envPath from '../constants/env-path.js';

const dotenvConfig = dotenv.config({ path: envPath });

export default dotenvConfig;
