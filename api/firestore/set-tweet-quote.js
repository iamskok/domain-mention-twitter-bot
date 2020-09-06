const admin = require("firebase-admin")
const db = require("./db")

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

module.exports = setTweetQuote
