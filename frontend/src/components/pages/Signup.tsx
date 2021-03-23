import React from 'react'

import SignupForm from '../organisms/Signup/SignupForm'
import AuthPageWrapper from '../molecules/AuthPageWrapper'

const Signup: React.FC = () => {
  return (
    <AuthPageWrapper pageName="signup">
      <SignupForm />
    </AuthPageWrapper>
  )
}

export default Signup
