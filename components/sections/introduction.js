import React from 'react'
import { Jumbotron, Row, Col } from 'react-bootstrap'
import Styles from './../styles/variables.json'
import BigGlyf from './../BigGlyf'

function BoldWords ({ text }) {
  return <span style={{ color: Styles.$blue }}>{text}</span>
}

function Introduction () {
  return (
    <>
      <Jumbotron>
        <h1>Evan Tahler</h1>
        <h4>I use my <BoldWords text='Product Management' />, <BoldWords text='Software Engineering' />, and <BoldWords text='Leadership' /> skills to help build a team capable of creating world-class Digital Consumer Products.</h4>
      </Jumbotron>

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

export default Introduction
