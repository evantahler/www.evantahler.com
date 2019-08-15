import React from 'react'
import { Row, Col } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

function BigGlyf ({ name }) {
  return <span style={{
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
  }}><FontAwesome name={name} /></span>
}

function Contact () {
  return (
    <>
      <h2>Contact</h2>
      <hr />

      <Row>
        <Col md={4} style={{ textAlign: 'center' }}>
          <a href='https://twitter.com/evantahler'><BigGlyf name='twitter' /><br /> @evantahler</a>
        </Col>
        <Col md={4} style={{ textAlign: 'center' }}>
          <a href='https://linkedin.com/in/evantahler'><BigGlyf name='linkedin' /><br /> @evantahler</a>
        </Col>
        <Col md={4} style={{ textAlign: 'center' }}>
          <a href='mailto:evan@evantahler.com'><BigGlyf name='inbox' /><br />evan@evantahler.com</a>
        </Col>
      </Row>
    </>
  )
}

export default Contact
