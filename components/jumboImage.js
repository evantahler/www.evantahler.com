import React from 'react'
import { Image, Row, Col } from 'react-bootstrap'

function JumboImage ({ src }) {
  const style = {
    height: 300,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    objectFit: 'cover',
    borderRadius: 15
  }

  return (
    <>
      <Row>
        <Col md={12}>
          <Image style={style} src={src} />
        </Col>
      </Row>
    </>
  )
}

export default JumboImage
