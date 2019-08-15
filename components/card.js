import React from 'react'

function Card ({ header, title, text }) {
  return (
    <div className='card mb-3' style={{ margin: 10, width: '100%' }}>
      <div className='card-header'>{header}</div>
      <div className='card-body'>
        <h4 className='card-title'>{title}</h4>
        <div className='card-text'>{text}</div>
      </div>
    </div>
  )
}

export default Card
