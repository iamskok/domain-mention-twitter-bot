import EventEmitter from 'events';
import readStreamTweets from '../read-stream-tweets';
import twitUserAuth from '../../../services/twit-user-auth';
import tweetsMock from '../../../mocks/tweets';
import getPostTitle from '../../../utils/get-post-title';

const mockedEmitter = new EventEmitter();
const firestoreMock = {
  data: {},
  async setTweet(postTitle, tweet) {
    this.data[postTitle] = tweet;
  },
  async getTweet(postTitle) {
    return Promise.resolve(this.data[postTitle]);
  },
};

const expectedSnapshot = (tweetMock, postTitle, done) => {
  setTimeout(() => {
    mockedEmitter.emit('tweet', tweetMock);

    setTimeout(async () => {
      expect(firestoreMock.getTweet(postTitle)).resolves.toMatchSnapshot();
      mockedEmitter.removeAllListeners('tweet');
      done();
    }, 1000);
  }, 100);
};

describe('readStreamTweets', () => {
  it('returns `javascript` post title tweet with URL entities, which is not a quote or retweet', (done) => {
    jest.spyOn(twitUserAuth, 'stream')
      .mockImplementation(() => mockedEmitter);

    const url = 'https://example.com/blog/javascript';
    const postTitle = getPostTitle(url);

    readStreamTweets(postTitle, firestoreMock.setTweet.bind(firestoreMock));

    expectedSnapshot(tweetsMock[8], postTitle, done);
  });

  it('returns `react` post title tweet with URL entities, which is not a quote or retweet', (done) => {
    jest.spyOn(twitUserAuth, 'stream')
      .mockImplementation(() => mockedEmitter);

    const url = 'https://example.com/blog/react';
    const postTitle = getPostTitle(url);

    readStreamTweets(postTitle, firestoreMock.setTweet.bind(firestoreMock));

    expectedSnapshot(tweetsMock[9], postTitle, done);
  });

  it('returns undefined for quoted tweet', (done) => {
    jest.spyOn(twitUserAuth, 'stream')
      .mockImplementation(() => mockedEmitter);

    const url = 'https://example.com/blog/go';
    const postTitle = getPostTitle(url);

    readStreamTweets(postTitle, firestoreMock.setTweet.bind(firestoreMock));

    expectedSnapshot(tweetsMock[10], postTitle, done);
  });

  it('returns undefined for retweeted tweet', (done) => {
    jest.spyOn(twitUserAuth, 'stream')
      .mockImplementation(() => mockedEmitter);

    const url = 'https://example.com/blog/typescript';
    const postTitle = getPostTitle(url);

    readStreamTweets(postTitle, firestoreMock.setTweet.bind(firestoreMock));

    expectedSnapshot(tweetsMock[11], postTitle, done);
  });

  it('returns undefined for tweet without URL entities', (done) => {
    jest.spyOn(twitUserAuth, 'stream')
      .mockImplementation(() => mockedEmitter);

    readStreamTweets(undefined, firestoreMock.setTweet.bind(firestoreMock));

    expectedSnapshot(tweetsMock[12], undefined, done);
  });
});
