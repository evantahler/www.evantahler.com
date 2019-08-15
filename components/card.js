import React from 'react'

function Card ({ header, title, text }) {
  return (
    <div className='card mb-3' style={{ margin: 10, width: '100%' }}>
      <div className='card-header'>{header}</div>
      <div className='card-body'>
        <h4 class='card-title'>{title}</h4>
        <p class='card-text'>{text}</p>
      </div>
    </div>
  )
}

export default Card
