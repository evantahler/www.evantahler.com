import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import Page from './../components/templates/page'
import JumboImage from './../components/jumboImage'

const title = 'Evan Tahler: Speaking'

function SpeakingPage () {
  return (
    <Page title={title}>
      <>
        <h2>Speaking</h2>
        <hr />

        <JumboImage src='/static/images/speaking.jpg' />

        <p>I've given a number of technical talks, focusing on Node.js, Ruby, and DevOps.</p>

        <Row>
          <Col md={4}>
            <Card>
              <Card.Img variant='top' src='/static/images/seattlejs.jpg' />
              <Card.Body>
                <Card.Title>Using Next.JS to build Static Dynamic Websites… and never pay for font-end hosting again!</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>September, 2019</Card.Subtitle>
                <Card.Text>
                  <em>for SeattleJS, 2019</em>

                  <br />
                  <br />
                  This talk was inspired by a group of students learning to code in Seattle who were being taught tools like React and Angular, but struggling to learn how to deploy their sites using modern methods. Specifically, how to set up CI/CD (Continuous Integration + Continuous Deployment) and HTTPS.
                  <br />
                  <br />

                  * <a target='_blank' href='https://speakerdeck.com/evantahler/using-next-dot-js-to-build-static-dynamic-websites-dot-dot-dot-and-never-pay-for-font-end-hosting-again'>Slides</a><br />
                  * <a target='_blank' href='https://github.com/evantahler/next-static-hosting'>Code</a><br />
                </Card.Text>
              </Card.Body>
            </Card>
            <br />
          </Col>

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

                  * <a target='_blank' href='https://www.youtube.com/watch?list=PL83Wfqi-zYZHtHoGv3PcGQA3lvE9p1eRl&time_continue=218&v=NNTsHzER31I'>Video</a><br />
                  * <a target='_blank' href='https://speakerdeck.com/evantahler/background-jobs-in-node-dot-js-redisconf-2016'>Slides</a><br />
                  * <a target='_blank' href='https://blog.evantahler.com/background-tasks-in-node-js-a-survey-with-redis-971d3575d9d2'>Post</a><br />
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

                  * <a target='_blank' href='https://speakerdeck.com/evantahler/node-for-not-http'>Slides</a><br />
                  * <a target='_blank' href='https://github.com/evantahler/node_for_not_http'>Code</a><br />
                </Card.Text>
              </Card.Body>
            </Card>
            <br />
          </Col>
        </Row>
      </>
    </Page>
  )
}

export default SpeakingPage
