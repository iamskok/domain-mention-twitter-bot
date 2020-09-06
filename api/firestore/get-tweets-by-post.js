const db = require("./db")

const getTweetsByPost = async postTitle => {
  try {
    return await db.collection(`posts/${postTitle}/tweets`).get()
  } catch (error) {
    console.error(error)
  }
}

module.exports = getTweetsByPost
