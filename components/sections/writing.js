import React, { useState, useEffect } from 'react'
import { Row, Col, Alert } from 'react-bootstrap'
import Card from './../card'

function stripHtml (html) {
  const temporalDivElement = document.createElement('div')
  temporalDivElement.innerHTML = html
  return temporalDivElement.textContent || temporalDivElement.innerText || ' '
}

function Writing () {
  const [data, setData] = useState({ posts: [] })
  const feedUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@evantahler'

  useEffect(() => {
    async function fetchBlogPosts () {
      const data = await fetch(feedUrl).then(response => response.json()) //eslint-disable-line
      const posts = data.items.filter(item => item.thumbnail.indexOf('_/stat?') < 0)
      setData({ posts })
    }

    fetchBlogPosts()
  }, [])

  return (
    <>
      <h2>Writing</h2>
      <hr />

      <p>I blog at Medium under the name <a href='https://medium.com/@evantahler'>@evantahler</a>.</p>
      <Alert bsStyle='warning'>
        <a href='https://medium.com/@evantahler'>See all Posts</a>
      </Alert>

      <Row>
        {
          data.posts.map((post) => {
            return <Col md={6} key={post.guid}>
              <Card header={post.pubDate.split(' ')[0]} title={<a href={post.link}>{post.title}</a>} text={
                <>
                  <p><em>Categories: {post.categories.join(', ')}</em></p>
                  <p><img style={{ maxWidth: '99%', maxHeight: 300 }} src={post.thumbnail} /></p>
                  <p>{stripHtml(post.description.substring(0, 500))}...</p>
                </>
              } />
            </Col>
          })
        }
      </Row>
    </>
  )
}

export default Writing
