import { Global, ThemeProvider } from '@emotion/react'
import React from 'react'

import { AuthProvider } from './contexts/AuthContext'
import { GlobalStyles, Theme } from './theme'
import { Routes } from './Routes'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={Theme}>
      <Global styles={GlobalStyles} />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
