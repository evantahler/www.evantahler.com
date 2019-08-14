import React from 'react'
import Styles from './styles/variables.json'
import { Image } from 'react-bootstrap'

function Sidebar ({title, content}) {

  const style = {
    backgroundColor: Styles.$orange,
    minHeight: '100vh',
    height: '100%',
    width: '100%',
    textAlign: 'center',
    paddingTop: 100
  }

  return (
    <div className='sidebar' style={style}>
      <Image src="static/images/evan.jpg" className='rounded-circle' style={{maxWidth: '80%'}} />
    </div>
  )
}

export default Sidebar
