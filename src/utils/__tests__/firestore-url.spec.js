import firestoreUrl from '../firestore-url';
import firestoreUrlMock from '../../mocks/firestoreUrl';

const { FIREBASE_PROJECT_ID } = process.env;
const { postTitle, tweetId, isTweetsCollection } = firestoreUrlMock;

describe('firestoreUrl utility', () => {
  it('returns tweet document URL', () => {
    expect(firestoreUrl({ postTitle, tweetId }))
      .toBe(`https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/firestore/data~2Fposts~2F${postTitle}~2Ftweets~2F${tweetId}`);
  });

  it('returns tweets collection URL', () => {
    expect(firestoreUrl({ postTitle, isTweetsCollection }))
      .toBe(`https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/firestore/data~2Fposts~2F${postTitle}~2Ftweets`);
  });

  it('returns post document URL', () => {
    expect(firestoreUrl({ postTitle }))
      .toBe(`https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/firestore/data~2Fposts~2F${postTitle}`);
  });

  it('returns post collection URL', () => {
    expect(firestoreUrl())
      .toBe(`https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/firestore/data~2Fposts`);
  });
});
