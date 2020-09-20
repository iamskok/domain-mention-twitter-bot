import timeline from './api/bot/timeline.js';
import search from './api/bot/search.js';
import responses from './api/bot/responses.js';
import stream from './api/bot/stream.js';
import comments from './api/bot/comments.js';

const domainName = process.env.DOMAIN_NAME;

timeline(domainName);
search(domainName);
responses();
stream(domainName);
comments();
