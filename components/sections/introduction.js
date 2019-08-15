import React from 'react'
import { Jumbotron } from 'react-bootstrap'
import Styles from './../styles/variables.json'

function BoldWords ({ text }) {
  return <span style={{ color: Styles.$blue }}>{text}</span>
}

function Introduction () {
  return (
    <>
      <Jumbotron>
        <h1>Evan Tahler</h1>
        <h4>I use my <BoldWords text='Product Management' />, <BoldWords text='Software Engineering' />, and <BoldWords text='Leadership' /> skills to help build a team capable of creating world-class Digital Consumer Products.</h4>
      </Jumbotron>
    </>
  )
}

export default Introduction
