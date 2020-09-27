import timeline from './api/bot/timeline';
import search from './api/bot/search';
import responses from './api/bot/responses';
import stream from './api/bot/stream';
import comments from './api/bot/comments';

const { DOMAIN_NAME } = process.env;

timeline(DOMAIN_NAME);
search(DOMAIN_NAME);
responses();
comments();
stream(DOMAIN_NAME);
