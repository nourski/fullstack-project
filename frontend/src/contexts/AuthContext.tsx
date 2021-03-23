import React, { ReactNode, useState } from 'react'
import { Maybe, SetState } from '../types'

interface IProps {
  children: ReactNode
}

interface IAuthState {
  token: Maybe<string>
  isAuthenticated: boolean

  setToken: SetState<Maybe<string>>
  handleLogin: (token: string) => void
  handleLogout: () => void
}

const defaultAuthState: IAuthState = {
  token: '',
  isAuthenticated: false,

  setToken: (): void => {},
  handleLogin: (): void => {},
  handleLogout: (): void => {},
}

const AuthConstants = {
  ACCESS_TOKEN: 'image_search_app_access_token',
}

export const AuthDataFromStorage = () => localStorage.getItem(AuthConstants.ACCESS_TOKEN)

export const AuthProvider = ({ children }: IProps) => {
  const [token, setToken] = useState<Maybe<string>>(AuthDataFromStorage())
  const isAuthenticated = !!token

  const handleLogin = (token: string) => {
    localStorage.setItem(AuthConstants.ACCESS_TOKEN, token)
    setToken(token)
  }

  const handleLogout = () => {
    localStorage.removeItem(AuthConstants.ACCESS_TOKEN)
    setToken('')
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        setToken,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const AuthContext = React.createContext<IAuthState>(defaultAuthState)
