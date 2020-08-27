const getPostTitle = (url, base = `/blog/`) => {
    const { pathname } = new URL(url)
    let postTitle

    if (pathname.startsWith(base)) {
      postTitle = pathname.slice(base.length)

      if (postTitle.endsWith(`/`)) {
        postTitle = postTitle.slice(0, postTitle.length - 1)
      }
    }

  return postTitle
}

module.exports = { getPostTitle }