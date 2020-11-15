import getTweetsByPost from '../firestore/get-tweets-by-post';
import getTweetReplies from '../firestore/get-tweet-replies';
import getTweetQuotes from '../firestore/get-tweet-quotes';
import setTweetQuotes from '../firestore/set-tweet-quotes';
import setTweetReplies from '../firestore/set-tweet-replies';
import getAllPosts from '../firestore/get-all-posts';
import searchTweetResponses from '../twitter/search-tweet-responses';
import setFirebaseUpdated from '../../utils/set-firebase-updated';
import logger from '../../services/logger';

const responses = (recursionDepthLimit) => {
  logger.log('info', '>>>> Enter `core/responses`');

  return new Promise((resolve) => {
    // Trigger `core/comments` function when new entries were added in Firebase.
    let isFirebaseUpdated = false;

    getAllPosts().then((posts) => {
      logger.log('debug', '`core/responses` call `getAllPosts` with:', {
        posts,
      });

      const postPromises = [];

      posts.forEach((post) => postPromises.push((async () => {
        const postTitle = post.id;
        const tweets = await getTweetsByPost(postTitle);
        const tweetPromises = [];

        tweets.forEach((tweet) => tweetPromises.push((async () => {
          const tweetData = tweet.data();
          const tweetId = tweetData.id_str;

          const oldReplies = await getTweetReplies(postTitle, tweetId);
          const oldQuotes = await getTweetQuotes(postTitle, tweetId);

          const allReplies = await searchTweetResponses(tweetData, 'reply', oldReplies, recursionDepthLimit);
          const allQuotes = await searchTweetResponses(tweetData, 'quote', oldQuotes, recursionDepthLimit);

          // Prevent adding `undefined` in the DB.
          if (allReplies) {
            isFirebaseUpdated = isFirebaseUpdated || setFirebaseUpdated(oldReplies, allReplies);
            await setTweetReplies(postTitle, tweetId, allReplies);
          }

          // Prevent adding `undefined` in the DB.
          if (allQuotes) {
            isFirebaseUpdated = isFirebaseUpdated || setFirebaseUpdated(oldQuotes, allQuotes);
            await setTweetQuotes(postTitle, tweetId, allQuotes);
          }
        })()));

        await Promise.all(tweetPromises);
      })()));

      console.log('Promise.all', postPromises.length);

      return Promise.all(postPromises);
    }).catch(({ message }) => {
      logger.log('error', '`core/responses` catch block', {
        errorObject: message,
      });
    }).finally(() => {
      resolve(isFirebaseUpdated);
      logger.log('info', '>>>> Exit `core/responses`');
    });
  });
};

export default responses;
