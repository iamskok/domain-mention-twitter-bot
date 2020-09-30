// Transform tweet in comment object.
const normalizeComment = (tweet) => {
  const {
    created_at: createdAt,
    id_str: id,
    text,
    user: {
      screen_name: screenName,
      name,
      profile_image_url_https: avatarURL,
    },
    entities,
  } = tweet;

  // destructure entities
  // remove truthy checks
  // avatarURL => avatar
  // screenName => handle
  // profileURL => profile
  // createdAt => date || timestamp (convert to human readable)

  const comment = {
    createdAt: createdAt || null,
    url: `https://twitter.com/${screenName}/statuses/${id}`,
    profileURL: `https://twitter.com/${screenName}`,
    name: name || null,
    handle: screenName || null,
    avatarURL: avatarURL || null,
    content: {
      text: text || null,
      ...entities,
    },
  };

  return comment;
};

export default normalizeComment;
