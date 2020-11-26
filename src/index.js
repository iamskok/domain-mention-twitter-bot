// eslint-disable-next-line no-unused-vars
import dotenvConfig from './config/dotenv';
import extendError from './utils/extend-error';
import responses from './api/core/responses';
import stream from './api/core/stream';
import comments from './api/core/comments';
import RESPONSES_INTERVAL from './constants/responses';

extendError();

const { DOMAIN_NAME, RECURSION_DEPTH_LIMIT } = process.env;

stream(DOMAIN_NAME);

comments();

setInterval(() => {
  responses(RECURSION_DEPTH_LIMIT).then((isFirebaseUpdated) => {
    if (isFirebaseUpdated) {
      comments();
    }
  });
}, RESPONSES_INTERVAL);
