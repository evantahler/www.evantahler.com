import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import IndexPage from '../../pages/index.js'

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = undefined
})

describe('Index Page', () => {
  it('renders the page', () => {
    act(() => { render(<IndexPage />, container) })
    const header = container.querySelector('h1')
    expect(header.textContent).toBe('Evan Tahler')
  })
})
