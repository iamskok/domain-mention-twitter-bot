const dedupeTweets = (oldTweets, newTweets) => {
  const oldTweetIds = oldTweets.map(({ id_str }) => id_str)
  const dedupedNewTweets = newTweets.filter(({ id_str }) => !oldTweetIds.includes(id_str))

  return [
    ...oldTweets,
    ...dedupedNewTweets
  ]
}

module.exports = dedupeTweets
