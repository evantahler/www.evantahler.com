import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Head from 'next/head'
import Header from './../header'

function PageTemplate ({ title, children }) {
  const year = new Date().getFullYear()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='viewport' content='width=device-width' />
        <link rel='stylesheet' type='text/css' href='/static/css/bootstrap.min.css' />
        <link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet' />
        <script src='/static/js/googleAnalytics.js' />
      </Head>

      <Header />

      <Container fluid>
        <Row>
          <Col md={12}>
            <br />
            <br />
            <br />
            <br />
            { children }
          </Col>
        </Row>

        <Row>
          <Col md={12} style={{ textAlign: 'center' }}>
            <p>Copyright, Evan Tahler {year}</p>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PageTemplate
