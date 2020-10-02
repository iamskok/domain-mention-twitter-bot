import getTweetsByPost from '../firestore/get-tweets-by-post';
import getTweetReplies from '../firestore/get-tweet-replies';
import getTweetQuotes from '../firestore/get-tweet-quotes';
import setTweetQuotes from '../firestore/set-tweet-quotes';
import setTweetReplies from '../firestore/set-tweet-replies';
import getAllPosts from '../firestore/get-all-posts';
import searchTweetResponses from '../twitter/search-tweet-responses';
import logger from '../../services/logger';

const responses = () => {
  logger.log('info', '>>>> Enter `bot/responses`');

  getAllPosts().then((posts) => {
    logger.log('debug', '`bot/responses` => `getAllPosts`', {
      posts,
    });

    posts.forEach(async (post) => {
      const postTitle = post.id;
      const tweets = await getTweetsByPost(postTitle);

      tweets.forEach(async (tweet) => {
        const tweetData = tweet.data();
        const tweetId = tweetData.id_str;

        const oldReplies = await getTweetReplies(postTitle, tweetId);
        const oldQuotes = await getTweetQuotes(postTitle, tweetId);

        const allReplies = await searchTweetResponses(tweetData, 'reply', oldReplies);
        const allQuotes = await searchTweetResponses(tweetData, 'quote', oldQuotes);

        // Prevent adding `undefined` in the DB.
        if (allReplies) {
          await setTweetReplies(postTitle, tweetId, allReplies);
        }

        // Prevent adding `undefined` in the DB.
        if (allQuotes) {
          await setTweetQuotes(postTitle, tweetId, allQuotes);
        }
      });
    });
  }).catch((error) => {
    logger.log('error', '`bot/responses`', {
      errorObject: error,
    });
  }).finally(() => {
    logger.log('info', '>>>> Exit `bot/responses`');
  });
};

export default responses;
