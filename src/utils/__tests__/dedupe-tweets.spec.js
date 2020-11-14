import dedupeTweets from '../dedupe-tweets';
import duplacateTweetsMock from '../../tests/mocks/duplicateTweets';

describe('dedupeTweets utility', () => {
  it('returns array of unique tweets when new tweets have copies of the old tweets', () => {
    expect(dedupeTweets(
      duplacateTweetsMock.oldTweets,
      [
        ...duplacateTweetsMock.oldTweets,
        ...duplacateTweetsMock.newTweets,
      ],
    )).toMatchSnapshot();
  });

  it('returns array of unique tweets when old tweets have copies of the new tweets', () => {
    expect(dedupeTweets(
      [
        ...duplacateTweetsMock.oldTweets,
        ...duplacateTweetsMock.newTweets,
      ],
      duplacateTweetsMock.newTweets,
    )).toMatchSnapshot();
  });

  it('returns array of new tweets when there are no old tweets', () => {
    expect(dedupeTweets(
      [],
      duplacateTweetsMock.newTweets,
    )).toMatchSnapshot();
  });

  it('returns array of old tweets when there are no new tweets', () => {
    expect(dedupeTweets(
      duplacateTweetsMock.oldTweets,
      [],
    )).toMatchSnapshot();
  });

  it('returns empty array when there are no old and new tweets', () => {
    expect(dedupeTweets([], [])).toHaveLength(0);
  });
});
