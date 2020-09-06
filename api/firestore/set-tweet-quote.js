import admin from "firebase-admin"
import db from "./db.js"

const setTweetQuote = async (postTitle, quote) => {
  const docRef = await db.doc(`posts/${postTitle}`)

  return docRef.collection(`tweets`)
    .doc(quote.quoted_status.id_str)
    .set(
      {
        quotes: admin.firestore.FieldValue.arrayUnion(quote),
      },
      {
        merge: true,
      },
    )
}

export default setTweetQuote
