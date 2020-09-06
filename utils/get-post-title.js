// Extract post title from a given URL
const getPostTitle = (url, base = `blog`) => {
  let { pathname } = new URL(url)
  let postTitle

  // Multiple `/` in the start of the string fixes accidental user typos.
  while(pathname.startsWith(`/`)) {
    pathname = pathname.slice(1)
  }

  // Multiple `/` in the end of the string fixes accidental user typos.
  if (pathname.startsWith(base + `/`)) {
    postTitle = pathname.slice(base.length + 1).replace(/\//g, ``)
  }

  return postTitle
}

export default getPostTitle
