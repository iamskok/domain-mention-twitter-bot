import timeline from './src/api/bot/timeline';
import search from './src/api/bot/search';
import responses from './src/api/bot/responses';
import stream from './src/api/bot/stream';
import comments from './src/api/bot/comments';

const { DOMAIN_NAME } = process.env;

timeline(DOMAIN_NAME);
search(DOMAIN_NAME);
responses();
comments();
stream(DOMAIN_NAME);
