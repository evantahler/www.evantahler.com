import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import ContactPage from '../../pages/contact'

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
    act(() => { render(<ContactPage />, container) })
    const header = container.querySelector('p')
    expect(header.textContent).toContain('reach out')
  })
})
