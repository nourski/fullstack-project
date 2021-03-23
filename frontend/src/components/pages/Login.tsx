import React from 'react'

import AuthPageWrapper from '../molecules/AuthPageWrapper'
import LoginForm from '../organisms/Login/LoginForm'

const Login: React.FC = () => {
  return (
    <AuthPageWrapper pageName="login">
      <LoginForm />
    </AuthPageWrapper>
  )
}

export default Login
