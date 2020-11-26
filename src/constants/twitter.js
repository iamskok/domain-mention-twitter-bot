// 180 API calls are allowed in 15 minute window.
// Reduce the max allowed limit to be safe.
const TWITTER_SEARCH_RATE_LIMIT = 175;
// Calculate the max allowed limit per minute.
const TWITTER_SEARCH_WINDOW_RATE_LIMIT = Math.floor(TWITTER_SEARCH_RATE_LIMIT / 15);

export default TWITTER_SEARCH_WINDOW_RATE_LIMIT;
