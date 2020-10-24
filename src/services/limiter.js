import limiter from 'limiter';
import TWITTER_SEARCH_RATE_LIMIT_PER_WINDOW from '../constants/twitter';

const { RateLimiter } = limiter;

const twitterLimiter = new RateLimiter(TWITTER_SEARCH_RATE_LIMIT_PER_WINDOW, 'minute');

export default twitterLimiter;
