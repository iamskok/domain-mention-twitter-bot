import limiter from 'limiter';
import TWITTER_SEARCH_WINDOW_RATE_LIMIT from '../constants/twitter';

const { RateLimiter } = limiter;

const twitterLimiter = new RateLimiter(TWITTER_SEARCH_WINDOW_RATE_LIMIT, 'minute');

export default twitterLimiter;
