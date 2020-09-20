import getTweetsByPost from '../firestore/get-tweets-by-post.js';
import getTweetReplies from '../firestore/get-tweet-replies.js';
import getTweetQuotes from '../firestore/get-tweet-quotes.js';
import setTweetQuotes from '../firestore/set-tweet-quotes.js';
import setTweetReplies from '../firestore/set-tweet-replies.js';
import getAllPosts from '../firestore/get-all-posts.js';
import searchTweetResponses from '../twitter/search-tweet-responses.js';

const responses = () => {
  getAllPosts().then((posts) => {
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

        await setTweetReplies(postTitle, tweetId, allReplies);
        await setTweetQuotes(postTitle, tweetId, allQuotes);
      });
    });
  });
};

export default responses;
