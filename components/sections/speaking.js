import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'

function Speaking () {
  return (
    <>
      <h2>Speaking</h2>
      <hr />

      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant='top' src='/static/images/redisconf.jpg' />
            <Card.Body>
              <Card.Title>Background Tasks in Node.js: A survey with Redis.</Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>May, 2016</Card.Subtitle>
              <Card.Text>
                for RedisConf, 2016

                <br />
                <br />

                Node.js' Async programming model allows us to emulate many types of advanced systems.  In this talk, we will use node and redis to recreate 7 different types of background job systems, from queues to kafka.

                <br />
                <br />

                <ul>
                  <li><a target='_blank' href='https://www.youtube.com/watch?list=PL83Wfqi-zYZHtHoGv3PcGQA3lvE9p1eRl&time_continue=218&v=NNTsHzER31I'>Video</a></li>
                  <li><a target='_blank' href='https://speakerdeck.com/evantahler/background-jobs-in-node-dot-js-redisconf-2016'>Slides</a></li>
                  <li><a target='_blank' href='https://blog.evantahler.com/background-tasks-in-node-js-a-survey-with-redis-971d3575d9d2'>Post</a></li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
        </Col>

        <Col md={4}>
          <Card>
            <Card.Img variant='top' src='/static/images/sfnode.jpg' />
            <Card.Body>
              <Card.Title>Node for ! (not) HTTP</Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>Dec, 2015</Card.Subtitle>
              <Card.Text>
                <em>for SF Node, 2015</em>

                <br />
                <br />

                Node.js is great for all sorts of projects.  In this demo, we will use NOde.js to control the lights in our house via the DMX proticol.

                <br />
                <br />

                <ul>
                  <li><a target='_blank' href='https://speakerdeck.com/evantahler/node-for-not-http'>Slides</a></li>
                  <li><a target='_blank' href='https://github.com/evantahler/node_for_not_http'>Code</a></li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
        </Col>
      </Row>
    </>
  )
}

export default Speaking
