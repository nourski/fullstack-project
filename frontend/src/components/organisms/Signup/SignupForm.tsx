import { FormikProps } from 'formik'
import { useHistory } from 'react-router-dom'
import React, { useContext, useRef, useState } from 'react'

import { AuthContext } from '../../../contexts/AuthContext'
import { IFormValues } from '../../../types/form'
import { paths } from '../../../Routes'
import { post } from '../../../api/requests'
import { schema } from './validations'

import AuthForm from '../AuthForm'

const SignupForm: React.FC = () => {
  const [error, setError] = useState('')
  const { handleLogin } = useContext(AuthContext)
  const history = useHistory()
  const bagRef = useRef<FormikProps<IFormValues>>()

  const setDefaultError = () => setError('An unexpected error has occured. Please try again.')

  const submitForm = async () => {
    setError('')
    try {
      const response = await post('users', {
        username: bagRef?.current?.values['username'],
        password: bagRef?.current?.values['password'],
      })
      const responseJSON = await response.json()

      if (response.status === 422 && responseJSON?.errors?.username) {
        bagRef?.current?.setFieldError(
          'username',
          `Username ${responseJSON?.errors?.username?.[0]}`,
        )
      } else if (response.status === 201) {
        handleLogin(responseJSON.token)
      } else {
        setDefaultError()
      }
    } catch (e) {
      setDefaultError()
      bagRef.current?.setSubmitting(false)
    }
  }

  const onSubmit = () => {
    if (bagRef.current?.values['password'] !== bagRef.current?.values['passwordConfirmation']) {
      bagRef.current?.setFieldError(
        'passwordConfirmation',
        'Password & password confirmation must match.',
      )
    } else {
      submitForm()
    }
  }

  return (
    <AuthForm
      schema={schema}
      fields={[
        { name: 'username', placeholder: 'username' },
        { name: 'password', placeholder: 'password', type: 'password' },
        { name: 'passwordConfirmation', placeholder: 'password confirmation', type: 'password' },
      ]}
      bagRef={bagRef}
      error={error}
      primaryActionLabel="signup"
      secondaryActionLabel="login"
      primaryAction={onSubmit}
      secondaryAction={() => history.push(paths.login)}
    />
  )
}

export default SignupForm
