const db = require("./db")

const getAllPosts = async () => {
  try {
    return await db.collection(`posts`).get()
  } catch (error) {
    console.error(error)
  }
}

module.exports = getAllPosts
