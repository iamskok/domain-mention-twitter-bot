import normalizeComment from '../normalize-comment';
import tweet from '../../tests/options/firebaseTweet';

describe('normalizeComment', () => {
  it('returns comment object', () => {
    expect(normalizeComment(tweet.comment, [])).toMatchSnapshot();
  });
});
