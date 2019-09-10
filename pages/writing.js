import React, { useState, useEffect } from 'react'
import { Row, Col, Alert, Card, Badge, Spinner } from 'react-bootstrap'
import Page from './../components/templates/page'

const title = 'Evan Tahler: Writing'

function stripHtml(html) {
  const temporalDivElement = document.createElement('div')
  temporalDivElement.innerHTML = html
  return temporalDivElement.textContent || temporalDivElement.innerText || ' '
}

function WritingPage() {
  const [data, setData] = useState({ posts: [] })
  const feedUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@evantahler'

  useEffect(() => {
    async function fetchBlogPosts() {
      const data = await fetch(feedUrl).then(response => response.json()) //eslint-disable-line
      const posts = data.items.filter(item => item.thumbnail.indexOf('_/stat?') < 0)
      setData({ posts })
    }

    fetchBlogPosts()
  }, [])

  return (
    <Page title={title}>
      <>
        <h2>Writing</h2>
        <hr />

        <p>I blog at Medium under the name <a href='https://medium.com/@evantahler'>@evantahler</a>.</p>
        <Alert variant='info'>
          <a href='https://medium.com/@evantahler'>See all Posts</a>
        </Alert>

        <Row>
          {
            data.posts.length > 0
              ? data.posts.map((post) => {
                return <Col md={4} key={post.guid}>
                  <Card>
                    <Card.Img style={{ maxHeight: 300 }} variant='top' src={post.thumbnail} />
                    <Card.Body>
                      <Card.Title><a target='_blank' href={post.link}>{post.title}</a></Card.Title>
                      <Card.Subtitle className='mb-2 text-muted'>{post.pubDate.split(' ')[0]}</Card.Subtitle>
                      <Card.Text>
                        {stripHtml(post.description.substring(0, 500))}...
                        <br />
                        <br />
                        <em>Categories: {post.categories.map(category => <Badge key={`${post.guid}-${category}`} variant='secondary' > {category}</Badge>)}</em>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <br />
                </Col>
              })
              : <Row><Col md={12} style={{ textAlign: 'center' }}><Spinner animation='grow' /></Col></Row>
          }
        </Row>
      </>
    </Page >
  )
}

export default WritingPage
