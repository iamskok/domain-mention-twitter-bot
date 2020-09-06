import db from "./db.js"

const getAllPosts = async () => {
  try {
    return await db.collection(`posts`).get()
  } catch (error) {
    console.error(error)
  }
}

export default getAllPosts
