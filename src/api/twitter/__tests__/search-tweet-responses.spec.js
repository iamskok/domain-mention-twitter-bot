import * as rateLimitedTwitterRequestModule from '../rate-limited-twitter-request';
import searchTweetResponses from '../search-tweet-responses';
import tweetsMock from '../../../mocks/tweets';

const rateLimitedTwitterRequestMock = (endpoint, options, twitAuth, limiter) => {
  const isReply = !!options.q.includes('to:');

  if (isReply) {
    return new Promise((resolve) => {
      resolve({
        statuses: tweetsMock.filter(({ in_reply_to_status_id_str: replyId }) => !!replyId),
      });
    });
  }

  return new Promise((resolve) => {
    resolve({
      statuses: tweetsMock.filter(({ quoted_status_id_str: quoteId }) => !!quoteId),
    });
  });
};

describe('searchTweetResponses', () => {
  it('returns single tweet reply with child quote and reply', () => {
    jest.spyOn(rateLimitedTwitterRequestModule, 'rateLimitedTwitterRequest')
      .mockImplementation(rateLimitedTwitterRequestMock);

    expect(searchTweetResponses(tweetsMock[0], 'reply', [])).resolves.toMatchSnapshot();
  });

  it('returns single tweet quote with child quote and reply', () => {
    jest.spyOn(rateLimitedTwitterRequestModule, 'rateLimitedTwitterRequest')
      .mockImplementation(rateLimitedTwitterRequestMock);

    expect(searchTweetResponses(tweetsMock[0], 'quote', [])).resolves.toMatchSnapshot();
  });

  it('returns no quotes', () => {
    jest.spyOn(rateLimitedTwitterRequestModule, 'rateLimitedTwitterRequest')
      .mockImplementation(rateLimitedTwitterRequestMock);

    expect(searchTweetResponses(tweetsMock[7], 'quote', [])).resolves.toEqual([]);
  });

  it('returns no replies', () => {
    jest.spyOn(rateLimitedTwitterRequestModule, 'rateLimitedTwitterRequest')
      .mockImplementation(rateLimitedTwitterRequestMock);

    expect(searchTweetResponses(tweetsMock[7], 'quote', [])).resolves.toEqual([]);
  });
});
