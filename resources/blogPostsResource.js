import { createResource } from 'react-cache'

function stripHtml (html) {
  const temporalDivElement = document.createElement('div')
  temporalDivElement.innerHTML = html
  return temporalDivElement.textContent || temporalDivElement.innerText || ' '
}

const BlogPostsResource = createResource(
  async (username) => {
    const feedUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`
    const data = await fetch(feedUrl).then(response => response.json()) //eslint-disable-line
    const posts = data.items.filter(item => item.thumbnail.indexOf('_/stat?') < 0)

    for (const i in posts) {
      posts[i].description = stripHtml(posts[i].description.substring(0, 500))
    }

    return posts
  }
)

export default BlogPostsResource
