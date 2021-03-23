import { act, render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '@emotion/react'
import React from 'react'

import { Theme } from '../theme'

import Signup from '../components/pages/Signup'

test('Disables signup button if any field is empty or invalid', async () => {
  render(
    <ThemeProvider theme={Theme}>
      <Signup />
    </ThemeProvider>,
  )

  const signupButton = screen.queryByText('Signup')
  expect(signupButton).toBeDisabled()

  const username = screen.getByPlaceholderText('Username')
  const password = screen.getByPlaceholderText('Password')
  const passwordConfirmation = screen.getByPlaceholderText('Password Confirmation')

  fireEvent.change(username, { target: { value: 'username' } })
  fireEvent.change(password, { target: { value: '123456' } })
  fireEvent.change(passwordConfirmation, { target: { value: '123456' } })

  expect(signupButton).not.toBeDisabled()
})

test('Disables signup button if password and password confirmation do not match', async () => {
  render(
    <ThemeProvider theme={Theme}>
      <Signup />
    </ThemeProvider>,
  )

  const signupButton = screen.queryByText('Signup')

  const username = screen.getByPlaceholderText('Username')
  const password = screen.getByPlaceholderText('Password')
  const passwordConfirmation = screen.getByPlaceholderText('Password Confirmation')

  fireEvent.change(username, { target: { value: 'username' } })
  fireEvent.change(password, { target: { value: '123456' } })
  fireEvent.change(passwordConfirmation, { target: { value: '1' } })

  fireEvent.click(signupButton)

  expect(signupButton).toBeDisabled()
})
