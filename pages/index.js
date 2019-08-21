import React from 'react'
import Page from './../components/templates/page'

import Introduction from './../components/sections/introduction'
import Resume from './../components/sections/resume'
import Contact from './../components/sections/contact'
import OpenSource from './../components/sections/open-souce'
import Writing from './../components/sections/writing'
import Speaking from './../components/sections/speaking'

const title = 'Evan Tahler'

function IndexPage () {
  const sectionStyle = {
    paddingTop: 50,
    paddingBottom: 50
  }

  return (
    <Page title={title}>
      <Introduction />

      <div style={sectionStyle} id='resume'>
        <Resume />
      </div>

      <div style={sectionStyle} id='open-source'>
        <OpenSource />
      </div>

      <div style={sectionStyle} id='writing'>
        <Writing />
      </div>

      <div style={sectionStyle} id='speaking'>
        <Speaking />
      </div>

      <div style={sectionStyle} id='contact' >
        <Contact />
      </div>

      <br />
      <br />
    </Page>
  )
}

export default IndexPage
