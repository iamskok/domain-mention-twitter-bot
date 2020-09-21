import timeline from './api/bot/timeline.js';
import search from './api/bot/search.js';
import responses from './api/bot/responses.js';
import stream from './api/bot/stream.js';
import comments from './api/bot/comments.js';

const { DOMAIN_NAME } = process.env;

timeline(DOMAIN_NAME);
search(DOMAIN_NAME);
responses();
comments();
stream(DOMAIN_NAME);
