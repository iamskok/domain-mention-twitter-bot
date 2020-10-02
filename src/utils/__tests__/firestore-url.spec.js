import firestoreURL from '../firestore-url';

const { FIREBASE_PROJECT_ID } = process.env;

describe('firestoreURL utility', () => {
  const postTitle = 'jest-testing';
  const tweetId = '1311730829291327492';
  const isTweetsCollection = true;

  it('returns tweet document URL', () => {
    expect(firestoreURL({ postTitle, tweetId }))
      .toBe(`https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/firestore/data~2Fposts~2Fjest-testing~2Ftweets~2F1311730829291327492`);
  });

  it('returns tweets collection URL', () => {
    expect(firestoreURL({ postTitle, isTweetsCollection }))
      .toBe(`https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/firestore/data~2Fposts~2Fjest-testing~2Ftweets`);
  });

  it('returns post document URL', () => {
    expect(firestoreURL({ postTitle }))
      .toBe(`https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/firestore/data~2Fposts~2Fjest-testing`);
  });

  it('returns post collection URL', () => {
    expect(firestoreURL())
      .toBe(`https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/firestore/data~2Fposts`);
  });
});
