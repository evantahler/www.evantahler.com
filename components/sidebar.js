import React from 'react'
import Styles from './styles/variables.json'
import { Image } from 'react-bootstrap'
import Trianglify from 'trianglify'

function renderTriangles () {
  if (process.browser) {
    const sidebar = document.getElementById('sidebar')
    const dimensions = sidebar.getClientRects()[0]
    const pattern = Trianglify({
      width: dimensions.width,
      height: dimensions.height * 5,
      x_colors: 'Greys',
      cell_size: 30
    })

    sidebar.style['background-image'] = `url(${pattern.png()})`
  }
}

function Sidebar ({ title, content }) {
  const SidebarStyle = {
    backgroundColor: Styles['$gray-600'],
    height: '100%',
    textAlign: 'center',
    paddingTop: 100
  }

  const linksStyle = {
    color: 'black',
    fontWeight: 'bold',
    margin: 20
  }

  setTimeout(renderTriangles, 1)

  return (
    <div className='sidebar' id='sidebar' style={SidebarStyle}>
      <div className='d-none d-md-block'><Image src='static/images/evan.jpg' className='rounded-circle' style={{ maxWidth: '80%' }} /></div>
      <div className='d-md-none'><Image src='static/images/evan.jpg' className='rounded-circle' style={{ maxWidth: 200 }} /></div>

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
