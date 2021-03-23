import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '@emotion/react'
import React from 'react'

import { Theme } from '../theme'

import Login from '../components/pages/Login'

test('Disables login button if either field is empty or invalid', async () => {
  render(
    <ThemeProvider theme={Theme}>
      <Login />
    </ThemeProvider>,
  )

  const loginButton = screen.queryByText('Login')
  expect(loginButton).toBeDisabled()

  const username = screen.getByPlaceholderText('Username')
  const password = screen.getByPlaceholderText('Password')

  fireEvent.change(username, { target: { value: 'username' } })
  fireEvent.change(password, { target: { value: '123456' } })

  expect(loginButton).not.toBeDisabled()
})
