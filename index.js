import timeline from './api/bot/timeline.js';
import search from './api/bot/search.js';
import replies from './api/bot/replies.js';
import quotes from './api/bot/quotes.js';
import stream from './api/bot/stream.js';

const domainName = process.env.DOMAIN_NAME;

timeline(domainName);
search(domainName);
replies(domainName);
quotes(domainName);
stream(domainName);
