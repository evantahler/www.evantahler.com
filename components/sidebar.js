import React from 'react'
import Styles from './styles/variables.json'
import { Image } from 'react-bootstrap'

function Sidebar ({ title, content }) {
  const SidebarStyle = {
    backgroundColor: Styles.$orange,
    minHeight: '100vh',
    height: '100%',
    width: '100%',
    textAlign: 'center',
    paddingTop: 100
  }

  const linksStyle = {
    color: 'black',
    margin: 20
  }

  return (
    <div className='sidebar' style={SidebarStyle}>
      <Image src='static/images/evan.jpg' className='rounded-circle' style={{ maxWidth: '80%' }} />

      <div style={{
        paddingTop: 20
      }}>
        <p>
          <a style={linksStyle} href='#resume'>Resume</a>
        </p>
        <p>
          <a style={linksStyle} href='#open-source'>Open Source</a>
        </p>
        <p>
          <a style={linksStyle} href='#writing'>Writing</a>
        </p>
        <p>
          <a style={linksStyle} href='#speaking'>Speaking</a>
        </p>
        <p>
          <a style={linksStyle} href='#contact'>Contact</a>
        </p>
      </div>
    </div>
  )
}

export default Sidebar
