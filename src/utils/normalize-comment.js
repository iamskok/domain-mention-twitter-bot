import { commentTimestamp } from './timestamp';

// Transform tweet in comment object.
const normalizeComment = (tweet) => {
  const {
    created_at: createdAt,
    id_str: id,
    text,
    extended_tweet: extendedTweet,
    user: {
      screen_name: screenName,
      name,
      profile_image_url_https: avatarURL,
    },
    entities,
  } = tweet;

  const comment = {
    timestamp: createdAt ? commentTimestamp(createdAt) : null,
    url: `https://twitter.com/${screenName}/statuses/${id}`,
    text: extendedTweet?.full_text ? extendedTweet.full_text : text,
    entities: entities || null,
    user: {
      name: name || null,
      avatar: avatarURL || null,
      handle: `@${screenName}`,
      profile: `https://twitter.com/${screenName}`,
    },
  };

  return comment;
};

export default normalizeComment;
