import React from 'react'
import { Row, Col, Badge } from 'react-bootstrap'
import BigGlyf from './../BigGlyf'

function Contact () {
  return (
    <>
      <h2>Contact</h2>
      <hr />

      <Row>
        <Col md={4} style={{ textAlign: 'center' }}>
          <a href='https://twitter.com/evantahler'><BigGlyf name='twitter' /><br /> <Badge variant='secondary'>@evantahler</Badge></a>
        </Col>
        <Col md={4} style={{ textAlign: 'center' }}>
          <a href='https://linkedin.com/in/evantahler'><BigGlyf name='linkedin' /><br /> <Badge variant='secondary'>@evantahler</Badge></a>
        </Col>
        <Col md={4} style={{ textAlign: 'center' }}>
          <a href='mailto:evan@evantahler.com'><BigGlyf name='inbox' /><br /><Badge variant='secondary'>evan@evantahler.com</Badge></a>
        </Col>
      </Row>
    </>
  )
}

export default Contact
