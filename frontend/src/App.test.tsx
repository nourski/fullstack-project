import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('defaults to login page with unauthenticated user', () => {
  const { getByText } = render(<App />)
  expect(getByText('LOGIN')).toBeInTheDocument()
})
