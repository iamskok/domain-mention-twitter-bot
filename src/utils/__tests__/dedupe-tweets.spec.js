import dedupeTweets from '../dedupe-tweets'

describe('dedupeTweets utility', () => {
  const oldTweets = [
    { id_str: '1113510525045624835' },
    { id_str: '2213510525045624835' },
    { id_str: '3313510525045624835' },
  ];

  const newTweets = [
    { id_str: '4413510525045624835' },
    { id_str: '5513510525045624835' },
    { id_str: '6613510525045624835' },
  ];

  it('returns array of unique tweets when new tweets have copies of the old tweets', () => {
    console.log([...newTweets, { id_str: '1113510525045624835' }])
    expect(dedupeTweets(
      oldTweets,
      [
        ...newTweets,
        { id_str: '1113510525045624835' },
        { id_str: '2213510525045624835' },
        { id_str: '3313510525045624835' },
      ]
    )).toMatchSnapshot();
  });

  it('returns array of new tweets when there are no old tweets', () => {
    expect(dedupeTweets(
      [],
      newTweets
    )).toMatchSnapshot();
  });

  it('returns array of old tweets when there are no new tweets', () => {
    expect(dedupeTweets(
      oldTweets,
      []
    )).toMatchSnapshot();
  });

  it('returns empty array when there are no old and new tweets', () => {
    expect(dedupeTweets([], [])).toHaveLength(0);
  });
})