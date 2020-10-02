const { FIREBASE_PROJECT_ID } = process.env;

const firestoreURL = ({
  postTitle,
  tweetId,
  isTweetsCollection,
} = {}) => {
  // Tweet document URL.
  if (postTitle && tweetId) {
    return `https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/firestore/data~2Fposts~2F${postTitle}~2Ftweets~2F${tweetId}`;
  }

  // Tweets collection URL.
  if (postTitle && isTweetsCollection) {
    return `https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/firestore/data~2Fposts~2F${postTitle}~2Ftweets`;
  }

  if (postTitle) {
    // Post document URL.
    return `https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/firestore/data~2Fposts~2F${postTitle}`;
  }

  // Posts collection URL.
  return `https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/firestore/data~2Fposts`;
};

export default firestoreURL;
