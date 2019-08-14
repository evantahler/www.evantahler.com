import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import Head from 'next/head'
import Sidebar from './../sidebar'

function PageTemplate ({title, content}) {
  return (
    <>
    <Head>
      <title>{title}</title>
      <meta name='viewport' content='width=device-width' />
      <link rel='stylesheet' type='text/css' href='/static/css/bootstrap.min.css' />
      <link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet' />
      <script src='/static/js/googleAnalytics.js' />
    </Head>

      <Grid fluid>
        <Row>
          <Col md={3} style={{padding: 0}}>
            <Sidebar />
          </Col>
          <Col md={9}>
            <br />
            { content }
          </Col>
        </Row>
      </Grid>
    </>
  )
}

export default PageTemplate
