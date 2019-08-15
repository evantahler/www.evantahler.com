import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Card from './../card'

function Speaking () {
  return (
    <>
      <h2>Speaking</h2>
      <hr />

      <Row>
        <Col md={6}>
          <Card header='May, 2016' title='Background Tasks in Node.js: A survey with Redis.' text={
            <>
              <ul>
                <li><a href='https://www.youtube.com/watch?list=PL83Wfqi-zYZHtHoGv3PcGQA3lvE9p1eRl&time_continue=218&v=NNTsHzER31I'>Video</a></li>
                <li><a href='https://speakerdeck.com/evantahler/background-jobs-in-node-dot-js-redisconf-2016'>Slides</a></li>
                <li><a href='https://blog.evantahler.com/background-tasks-in-node-js-a-survey-with-redis-971d3575d9d2'>Post</a></li>
              </ul>

              <p>for RedisConf, 2016</p>
            </>
          } />
        </Col>

        <Col md={6}>
          <Card header='Dec, 2015' title='Node for ! (not) HTTP' text={
            <>
              <ul>
                <li><a href='https://speakerdeck.com/evantahler/node-for-not-http'>Slides</a></li>
                <li><a href='https://github.com/evantahler/node_for_not_http'>Code</a></li>
              </ul>

              <p>for SF Node, 2015</p>
            </>
          } />
        </Col>
      </Row>
    </>
  )
}

export default Speaking
