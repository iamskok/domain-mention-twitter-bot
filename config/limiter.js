import RateLimiterModule from 'limiter';

const { RateLimiter } = RateLimiterModule;

// 15 mins time window
const searchTweetsRequestWindow = 15 * 60 * 1000;
// const searchTweetsRequestWindow = 10000;
// User Auth API rate limit
// const userAuthLimit = 180;
const userAuthLimit = 150;

const limiter = new RateLimiter(userAuthLimit, searchTweetsRequestWindow);

export default limiter;
