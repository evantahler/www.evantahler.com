import React from 'react'
import Styles from './styles/variables.json'
import { Image } from 'react-bootstrap'
import Trianglify from 'trianglify'

let renderCount = 0
const maxRenders = 100

function renderTriangles () {
  if (process.browser & renderCount < maxRenders) {
    const sidebar = document.getElementById('sidebar')
    const dimensions = sidebar.getClientRects()[0]
    const pattern = Trianglify({
      width: dimensions.width,
      height: dimensions.height * 2,
      x_colors: 'YlOrRd',
      cell_size: 30
    })
    // sidebar.appendChild(pattern.canvas())
    sidebar.style['background-image'] = `url(${pattern.png()})`
    renderCount++
  }
}

function Sidebar ({ title, content }) {
  const SidebarStyle = {
    backgroundColor: Styles.$orange,
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
  setInterval(renderTriangles, 1000 * 5)

  return (
    <div className='sidebar' id='sidebar' style={SidebarStyle}>
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
