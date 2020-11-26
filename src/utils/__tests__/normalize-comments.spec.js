import normalizeComment from '../normalize-comment';
import tweet from '../../tests/options/firebaseTweet';

describe('normalizeComment', () => {
  it('returns comment object with extended text field', () => {
    expect(normalizeComment(tweet.comment[0], [])).toMatchSnapshot();
  });

  it('returns comment object with regular text field', () => {
    expect(normalizeComment(tweet.comment[1], [])).toMatchSnapshot();
  });
});
