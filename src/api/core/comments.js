import getAllPosts from '../firestore/get-all-posts';
import getTweetsByPost from '../firestore/get-tweets-by-post';
import setCommentsByPost from '../firestore/set-comments-by-post';
import normalizeComment from '../../utils/normalize-comment';
import sortTweetsByTime from '../../utils/sort-tweets-by-time';
import logger from '../../services/logger';

const comments = () => {
  logger.log('info', '>>>> Enter `core/comments`');

  getAllPosts().then((posts) => {
    logger.log('debug', '`core/comments` call `getAllPosts` with:', {
      posts,
    });

    posts.forEach(async (post) => {
      const tweets = [];

      const postTitle = post.id;
      const tweetsByPost = await getTweetsByPost(postTitle);

      tweetsByPost.forEach((tweet) => tweets.push(tweet.data()));
      const commentsByPost = tweets.map((tweet) => sortTweetsByTime(tweet)).flat(Infinity);

      // Remove all children replies and quotes.
      const normalizedCommentsByPost = commentsByPost.map(normalizeComment);

      setCommentsByPost(postTitle, normalizedCommentsByPost);
    });
  }).catch(({ message }) => {
    logger.log('error', '`core/comments` catch block', {
      errorObject: message,
    });
  }).finally(() => {
    logger.log('info', '>>>> Exit `core/comments`');
  });
};

export default comments;
