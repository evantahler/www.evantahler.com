import React, { useState, useEffect } from 'react'
import { Row, Col, Alert, Card, Badge, Spinner } from 'react-bootstrap'
import Page from './../components/templates/page'
import JumboImage from './../components/jumboImage'

const title = 'Evan Tahler: Writing'

function stripHtml (html) {
  const temporalDivElement = document.createElement('div')
  temporalDivElement.innerHTML = html
  return temporalDivElement.textContent || temporalDivElement.innerText || ' '
}

function WritingPage () {
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

  const featuredPosts = [
    {
      guid: 'a93eab6518ed',
      title: 'The Voom Software Engineering Interview Process',
      link: 'https://blog.voom.flights/the-voom-software-engineering-interview-process-a93eab6518ed',
      thumbnail: 'https://miro.medium.com/max/2200/1*9HNP1gUTyhHlUcbJBNYpgg.jpeg',
      date: '2019-03-20',
      description: 'Over the past year, we have been working on creating an interview process for our engineering team with these 4 goals in mind: "Efficiency", "Focus on what the job will be like", "Test only relevant skills", and "Be inclusive". Airbus’ new UAM (Urban Air Mobility) division has given us an incredible amount of leeway to craft a process that best meets our needs and helps us to find the best talent available.  We are trying not to fall into common software engineering interview traps, and have come up with a rather unique process we are excited to share.',
      categories: ['Recruiting', 'Software Engineering', 'Building Voom', 'Pair Programming', 'Teamwork']
    },
    {
      guid: '9a4b5caf4e62',
      title: 'Why Choose Actionhero',
      link: 'https://blog.evantahler.com/why-choose-actionhero-9a4b5caf4e62',
      thumbnail: 'https://miro.medium.com/max/4316/1*FWU1OZyieAZc__WqiNXGrQ.png',
      date: '2017-02-27',
      description: 'Until now, I’ve taken a very soft stance on “why” Actionhero might be better than any other server framework/tool for your project, as every project is different. Maybe all of your project’s goals really would be met using only Express, and all you need is a JSON-speaking REST API server. That said, every project I’ve worked on always needed… more.',
      categories: ['Nodejs', 'JavaScript', 'Actionherojs', 'Expressjs', 'Koajs']
    },
    {
      guid: 'f800f96b9c31',
      title: 'Tips for Building International Products and Companies',
      link: 'https://blog.voom.flights/tips-for-building-international-products-and-companies-f800f96b9c31',
      thumbnail: 'https://miro.medium.com/max/11520/1*kPialmqAJFyZG3FCt1JC-A.jpeg',
      date: '2018-10-08',
      description: 'As a product and engineering team based in the US, we have been focused on building a product for international markets from day one. We’ve spent a lot of time thinking about the best way to build, what Voom CEO Uma Subramanian, calls a “born-global” business. Here are are few of the principals we’ve adopted along the way.',
      categories: ['Travel', 'Product', 'Product Management', 'International Development', 'Building Voom']
    }
  ]

  return (
    <Page title={title}>
      <>
        <h1>Writing</h1>
        <hr />

        <JumboImage src='/static/images/writing.jpg' />

        <p>I blog at Medium under the name <a href='https://medium.com/@evantahler'>@evantahler</a>.</p>
        <Alert variant='info'>
          <a href='https://medium.com/@evantahler'>See all Posts</a>
        </Alert>

        <h2>Featured Writing</h2>
        <Row>
          {
            featuredPosts.map((post) => {
              return (
                <Col md={4} key={post.guid}>
                  <Card>
                    <Card.Img style={{ maxHeight: 300 }} variant='top' src={post.thumbnail} />
                    <Card.Body>
                      <Card.Title><a target='_blank' href={post.link}>{post.title}</a></Card.Title>
                      <Card.Subtitle className='mb-2 text-muted'>{post.date}</Card.Subtitle>
                      <Card.Text>
                        {post.description}
                        <br />
                        <br />
                        <em>Categories: {post.categories.map(category => <Badge key={`${post.guid}-${category}`} variant='secondary' > {category}</Badge>)}</em>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })
          }
        </Row>

        <br />
        <hr />
        <h2>Latest Posts</h2>
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
              : <Col md={12} style={{ textAlign: 'center' }}><Spinner animation='grow' /></Col>
          }
        </Row>
      </>
    </Page >
  )
}

export default WritingPage
