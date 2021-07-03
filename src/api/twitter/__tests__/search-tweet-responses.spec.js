import * as rateLimitedTwitterRequestModule from '../rate-limited-twitter-request';
import searchTweetResponses from '../search-tweet-responses';
import tweetsMock from '../../../tests/mocks/tweets';

const { RECURSION_DEPTH_LIMIT } = process.env;

// eslint-disable-next-line no-unused-vars
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
  it('returns single tweet reply with child quote and reply', async () => {
    jest.spyOn(rateLimitedTwitterRequestModule, 'rateLimitedTwitterRequest')
      .mockImplementation(rateLimitedTwitterRequestMock);

    const result = await searchTweetResponses(tweetsMock[0], 'reply', [], RECURSION_DEPTH_LIMIT);

    expect(result).toMatchSnapshot();
  });

  it('returns single tweet quote with child quote and reply', async () => {
    jest.spyOn(rateLimitedTwitterRequestModule, 'rateLimitedTwitterRequest')
      .mockImplementation(rateLimitedTwitterRequestMock);

    const result = await searchTweetResponses(tweetsMock[0], 'quote', [], RECURSION_DEPTH_LIMIT);

    expect(result).toMatchSnapshot();
  });

  it('exceeds `RECURSION_DEPTH_LIMIT` and returns quote with no child quotes and replies', async () => {
    jest.spyOn(rateLimitedTwitterRequestModule, 'rateLimitedTwitterRequest')
      .mockImplementation(rateLimitedTwitterRequestMock);

    const result = await searchTweetResponses(tweetsMock[0], 'quote', [], 1);

    expect(result).toMatchSnapshot();
  });

  it('exceeds `RECURSION_DEPTH_LIMIT` and returns reply with no child quotes and replies', async () => {
    jest.spyOn(rateLimitedTwitterRequestModule, 'rateLimitedTwitterRequest')
      .mockImplementation(rateLimitedTwitterRequestMock);

    const result = await searchTweetResponses(tweetsMock[0], 'reply', [], 1);

    expect(result).toMatchSnapshot();
  });

  it('returns no quotes', () => {
    jest.spyOn(rateLimitedTwitterRequestModule, 'rateLimitedTwitterRequest')
      .mockImplementation(rateLimitedTwitterRequestMock);

    expect(searchTweetResponses(tweetsMock[7], 'quote', [], RECURSION_DEPTH_LIMIT)).resolves.toEqual([]);
  });

  it('returns no replies', () => {
    jest.spyOn(rateLimitedTwitterRequestModule, 'rateLimitedTwitterRequest')
      .mockImplementation(rateLimitedTwitterRequestMock);

    expect(searchTweetResponses(tweetsMock[7], 'quote', [], RECURSION_DEPTH_LIMIT)).resolves.toEqual([]);
  });
});
