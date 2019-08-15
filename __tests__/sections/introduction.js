import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import IndexPage from '../../components/sections/introduction'

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = undefined
})

describe('Introcudtion Section', () => {
  it('renders the section', () => {
    act(() => { render(<IndexPage />, container) })
    const header = container.querySelector('h1')
    expect(header.textContent).toBe('Evan Tahler')
  })
})
