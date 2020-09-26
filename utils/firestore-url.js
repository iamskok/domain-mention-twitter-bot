const { FIREBASE_PROJECT_ID } = process.env;

const firestoreURL = ({
  postTitle,
  tweetId,
  tweet,
}) => {
  // Tweet document URL.
  if (postTitle && tweetId) {
    return `https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/firestore/data~2Fposts~2F${postTitle}~2Ftweets~2F${tweetId}`;
  }

  // Tweets collection URL.
  if (postTitle && tweet) {
    return `https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/firestore/data~2Fposts~2F${postTitle}~2Ftweets`;
  }

  if (postTitle) {
    // Post document URL.
    return `https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/firestore/data~2Fposts~2F${postTitle}`;
  }

  // Posts collection URL.
  return `https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/firestore/data~2Fposts`;
};

// const firestoreURL = (postTitle, tweetId) => {
//     if (tweetId) {
//       return `https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/firestore/data~2Fposts~2F${postTitle}~2Ftweets~2F${tweetId}`;
//     }

//     return `https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/firestore/data~2Fposts~2F${postTitle}`;
//   };

export default firestoreURL;
