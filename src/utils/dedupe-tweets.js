const dedupeTweets = (oldTweets, newTweets) => {
  const oldTweetIds = oldTweets.map(({ id_str: idStr }) => idStr);
  const dedupedNewTweets = newTweets.filter(({ id_str: idStr }) => !oldTweetIds.includes(idStr));

  return [
    ...oldTweets,
    ...dedupedNewTweets,
  ];
};

export default dedupeTweets;
