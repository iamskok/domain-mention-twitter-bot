import getTweetsByPost from '../firestore/get-tweets-by-post.js';
import getTweetQuotes from '../firestore/get-tweet-quotes.js';
import setTweetQuotes from '../firestore/set-tweet-quotes.js';
import getAllPosts from '../firestore/get-all-posts.js';
import searchTweetQuotes from '../twitter/search-tweet-quotes.js';

const quotes = () => {
  getAllPosts().then((posts) => {
    posts.forEach(async (doc) => {
      const postTitle = doc.id;
      const tweets = await getTweetsByPost(postTitle);

      tweets.forEach(async (tweet) => {
        const tweetData = tweet.data();
        const tweetId = tweetData.id_str;

        const oldQuotes = await getTweetQuotes(postTitle, tweetId);
        const allQuotes = await searchTweetQuotes(tweetData, oldQuotes);

        await setTweetQuotes(postTitle, tweetId, allQuotes);
      });
    });
  });
};

export default quotes;
