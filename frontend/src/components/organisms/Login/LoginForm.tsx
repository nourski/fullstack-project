import { FormikProps } from 'formik'
import { useHistory } from 'react-router-dom'
import React, { useContext, useRef, useState } from 'react'

import { AuthContext } from '../../../contexts/AuthContext'
import { IFormValues } from '../../../types/form'
import { paths } from '../../../Routes'
import { post } from '../../../api/requests'
import { schema } from './validations'

import AuthForm from '../AuthForm'

const LoginForm: React.FC = () => {
  const [error, setError] = useState('')
  const { handleLogin } = useContext(AuthContext)
  const history = useHistory()
  const bagRef = useRef<FormikProps<IFormValues>>()

  const setDefaultError = () => setError('An unexpected error has occured. Please try again.')

  const onSubmit = async () => {
    setError('')
    try {
      const response = await post('login', { ...bagRef.current?.values })
      if (response.status === 401) {
        setError('Invalid username or password.')
      } else if (response.status === 200) {
        const responseJSON = await response.json()
        handleLogin(responseJSON.token)
      } else {
        setDefaultError()
        bagRef.current?.setSubmitting(false)
      }
    } catch (e) {
      setDefaultError()
      bagRef.current?.setSubmitting(false)
    }
  }

  return (
    <AuthForm
      schema={schema}
      fields={[
        { name: 'username', placeholder: 'username' },
        { name: 'password', placeholder: 'password', type: 'password' },
      ]}
      bagRef={bagRef}
      error={error}
      primaryActionLabel="login"
      secondaryActionLabel="signup"
      primaryAction={onSubmit}
      secondaryAction={() => history.push(paths.signup)}
    />
  )
}

export default LoginForm
