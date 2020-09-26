import getAllPosts from '../firestore/get-all-posts.js';
import getTweetsByPost from '../firestore/get-tweets-by-post.js';
import setCommentsByPost from '../firestore/set-comments-by-post.js';
import removeTweetResponses from '../../utils/remove-tweet-responses.js';
import sortTweetsByTime from '../../utils/sort-tweets-by-time.js';
import logger from '../../services/logger.js';

const comments = () => {
  logger.log('info', '>>>> Enter `bot/comments`');

  getAllPosts().then((posts) => {
    logger.log('debug', '`bot/comments` => `getAllPosts`', {
      posts,
    });

    posts.forEach(async (post) => {
      const commentsByPost = [];
      const tweets = [];

      const postTitle = post.id;
      const tweetsByPost = await getTweetsByPost(postTitle);

      tweetsByPost.forEach((tweet) => tweets.push(tweet.data()));
      tweets.forEach((tweet) => sortTweetsByTime(tweet, commentsByPost));

      // Remove all children replies and quotes.
      const normalizedCommentsByPost = commentsByPost.map(removeTweetResponses);

      setCommentsByPost(postTitle, normalizedCommentsByPost);
    });
  }).catch((error) => {
    logger.log('error', '`bot/comments`', {
      errorObject: error,
    });
  }).finally(() => {
    logger.log('info', '>>>> Exit `bot/comments`');
  });
};

export default comments;
