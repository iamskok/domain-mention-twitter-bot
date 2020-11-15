import responses from './src/api/core/responses';
import stream from './src/api/core/stream';
import comments from './src/api/core/comments';
import RESPONSES_INTERVAL from './src/constants/responses';

const { DOMAIN_NAME, RECURSION_DEPTH_LIMIT } = process.env;

stream(DOMAIN_NAME);

setInterval(() => {
  responses(RECURSION_DEPTH_LIMIT).then((isFirebaseUpdated) => {
    if (isFirebaseUpdated) {
      comments();
    }
  });
}, RESPONSES_INTERVAL);
