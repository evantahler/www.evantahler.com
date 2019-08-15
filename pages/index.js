import React from 'react'
import Page from './../components/templates/page'

import Introduction from './../components/sections/introduction'
import Resume from './../components/sections/resume'
import Contact from './../components/sections/contact'

function IndexPage () {
  const title = 'Evan Tahler'

  const content = (
    <>
      <Introduction />
      <Resume />
      <Contact />
    </>
  )

  return <Page title={title} content={content} />
}

export default IndexPage
