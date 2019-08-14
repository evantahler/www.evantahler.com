import React from 'react'
import { Jumbotron } from 'react-bootstrap'
import Page from './../components/templates/page'
import Styles from './../components/styles/variables.json'
import FontAwesome from 'react-fontawesome'

function IndexPage () {
  const title = 'Evan Tahler'

  const content = (
    <>
      <Jumbotron>
        <h1>Evan <span style={{color: Styles.$orange}}>Tahler</span></h1>
        <h4>Product Management, Software Engineering, and Leadership</h4>
        <hr/>
        <p><a href='mailto:evan@evantahler.com'>evan@evantahler.com</a></p>
      </Jumbotron>

      <p>
        <FontAwesome name='twitter' />
      </p>
    </>
  )

  return <Page title={title} content={content} />
}

export default IndexPage
