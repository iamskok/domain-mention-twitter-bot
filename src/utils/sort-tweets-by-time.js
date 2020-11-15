// Ascending sort of all children replies and quotes based on timestamp.
const sortTweetsByTime = (tweet) => {
  const comments = [tweet];

  const { replies = [], quotes = [] } = tweet;

  const children = [...replies, ...quotes]
    .sort(
      (a, b) => new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf(),
    );

  children.forEach((child) => comments.push(sortTweetsByTime(child)));

  return comments;
};

export default sortTweetsByTime;
