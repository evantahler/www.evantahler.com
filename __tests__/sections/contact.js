import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'

import ContactSection from '../../components/sections/contact'

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
    act(() => { render(<ContactSection />, container) })
    const header = container.querySelector('div')
    expect(header.textContent).toContain('@evantahler')
  })
})
