import search from './src/api/core/search';
import responses from './src/api/core/responses';
import stream from './src/api/core/stream';
import comments from './src/api/core/comments';

const { DOMAIN_NAME } = process.env;

search(DOMAIN_NAME);
responses();
comments();
stream(DOMAIN_NAME);
