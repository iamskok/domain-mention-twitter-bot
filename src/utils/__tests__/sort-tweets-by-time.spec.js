import sortTweetsByTime from '../sort-tweets-by-time';
import tweet from '../../tests/options/firebaseTweet';

describe('sortTweetsByTime utility', () => {
  it('returns all replies and quotes sorted in ascending order', () => {
    expect(sortTweetsByTime(tweet.sortByTime, [])).toMatchSnapshot();
  });
});
