import { commentTimestamp } from './timestamp';

// Transform tweet in comment object.
const normalizeComment = (tweet) => {
  const {
    created_at: createdAt,
    id_str: id,
    extended_tweet: {
      full_text: text,
    },
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
    profile: `https://twitter.com/${screenName}`,
    name: name || null,
    handle: `@${screenName}`,
    avatar: avatarURL || null,
    content: {
      text: text || null,
      ...entities,
    },
  };

  return comment;
};

export default normalizeComment;
