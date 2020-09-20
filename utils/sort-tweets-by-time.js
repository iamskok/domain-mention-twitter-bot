// Ascending sort of all children replies and quotes based on timestamp.
const sortTweetsByTime = (tweet, comments) => {
  comments.push(tweet);

  const { replies = [], quotes = [] } = tweet;

  const children = [...replies, ...quotes]
    .sort(
      (a, b) => new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf(),
    );

  children.forEach((child) => sortTweetsByTime(child, comments));

  return comments;
};

export default sortTweetsByTime;
