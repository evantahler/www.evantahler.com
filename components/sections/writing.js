import React, { useState, useEffect } from 'react'
import { Table, Alert } from 'react-bootstrap'

function Writing () {
  const [data, setData] = useState({ posts: [] })
  const feedUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@evantahler'

  useEffect(() => {
    async function fetchBlogPosts () {
      const data = await fetch(feedUrl).then(response => response.json()) //eslint-disable-line
      setData({ posts: data.items })
    }

    fetchBlogPosts()
  }, [])

  return (
    <>
      <h2>Writing</h2>
      <hr />

      <p>I blog at Medium under the name <a href='https://medium.com/@evantahler'>@evantahler</a>.</p>
      <Alert bsStyle='info'>
        <a href='https://medium.com/@evantahler'>See all psots</a>
      </Alert>

      <Table striped condensed hover>
        <thead>
          <tr>
            <th />
            <th>Date</th>
            <th>Title</th>
            <th>Categiroes</th>
          </tr>
        </thead>
        <tbody>
          {
            data.posts.map((post) => {
              return <tr key={post.guid}>
                <td><img style={{ maxWidth: 75 }} src={post.thumbnail} /></td>
                <td>{post.pubDate.split(' ')[0]}</td>
                <td><strong><a href={post.link}>{post.title}</a></strong></td>
                <td>{post.categories.join(', ')}</td>
              </tr>
            })
          }
        </tbody>
      </Table>
    </>
  )
}

export default Writing
