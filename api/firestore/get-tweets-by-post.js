import db from "./db.js"

const getTweetsByPost = async postTitle => {
  try {
    return await db.collection(`posts/${postTitle}/tweets`).get()
  } catch (error) {
    console.error(error)
  }
}

export default getTweetsByPost
