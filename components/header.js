import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

function Sidebar ({ title, content }) {
  return (
    <Navbar fixed='top' bg='dark' variant='dark' expand='lg'>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Brand href='/'>Evan Tahler</Navbar.Brand>
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='#resume'>Resume</Nav.Link>
          <Nav.Link href='#writing'>Writing</Nav.Link>
          <Nav.Link href='#speaking'>Speaking</Nav.Link>
          <Nav.Link href='#open-source'>Open Source</Nav.Link>
          <Nav.Link href='#contact'>Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Sidebar
