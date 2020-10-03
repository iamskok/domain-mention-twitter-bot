import getAllPosts from '../firestore/get-all-posts';
import getTweetsByPost from '../firestore/get-tweets-by-post';
import setCommentsByPost from '../firestore/set-comments-by-post';
import normalizeComment from '../../utils/normalize-comment';
import sortTweetsByTime from '../../utils/sort-tweets-by-time';
import logger from '../../services/logger';

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
      const normalizedCommentsByPost = commentsByPost.map(normalizeComment);

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
