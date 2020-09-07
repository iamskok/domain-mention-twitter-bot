import twitAppAuth from '../../config/twit-app-auth.js';
import dedupeTweets from '../../utils/dedupe-tweets.js';

// Search replies for all tweets that are stored in the DB via `search/tweets` endpoint.
const searchTweetReplies = async (tweet, oldReplies) => {
  const userName = tweet.user.screen_name;
  const tweetId = tweet.id_str;

  return new Promise((resolve, reject) => {
    twitAppAuth.get(
      'search/tweets',
      {
        q: `to:${userName}`,
        count: 100,
        sinceId: tweetId,
      },
      async (error, data, response) => {
        if (error) {
          reject(error);
        } else if (response.statusCode === 200) {
          const newReplies = data.statuses.filter(
            (reply) => reply.in_reply_to_status_id_str === tweetId,
          );

          // All replies of the current tweet (can include current and nested replies).
          const replies = dedupeTweets(oldReplies, newReplies);

          // All transformed replies of the current tweet.
          const updatedReplies = [];
          const childRepliesPromises = [];

          for (let i = 0; i < replies.length; i += 1) {
            childRepliesPromises.push(new Promise((_resolve) => {
              const childTweet = replies[i];
              const childReplies = childTweet.replies || [];

              // Search all replies of the child tweet.
              _resolve(searchTweetReplies(childTweet, childReplies));
            }));
          }

          const childReplies = await Promise.all(childRepliesPromises);

          // Compose child replies with tweet replies.
          for (let i = 0; i < childReplies.length; i += 1) {
            const childTweet = replies[i];

            childTweet.replies = childReplies[i];
            updatedReplies.push(childTweet);
          }

          resolve(updatedReplies);
        }
      },
    );
  });
};

export default searchTweetReplies;
