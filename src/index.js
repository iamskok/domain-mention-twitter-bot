import extendError from './utils/extend-error';
import responses from './api/core/responses';
import stream from './api/core/stream';
import comments from './api/core/comments';
import RESPONSES_INTERVAL from './constants/responses';

extendError();

const { DOMAIN_NAME, RECURSION_DEPTH_LIMIT } = process.env;

stream(DOMAIN_NAME);

// setInterval(() => {
//   responses(RECURSION_DEPTH_LIMIT).then((isFirebaseUpdated) => {
//     if (isFirebaseUpdated) {
//       comments();
//     }
//   });
// }, RESPONSES_INTERVAL);
