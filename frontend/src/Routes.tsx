import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import React, { useContext } from 'react'

import { AuthContext } from './contexts/AuthContext'

import Browse from './components/pages/Browse'
import Favorites from './components/pages/Favorites'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'

export const paths = {
  browse: '/browse',
  favorites: '/favorites',
  login: '/login',
  root: '/',
  signup: '/signup',
}

export function Routes() {
  return (
    <Router>
      <Switch>
        <AuthenticatedRoute path={paths.browse} component={Browse} />
        <AuthenticatedRoute path={paths.favorites} component={Favorites} />

        <LoggedOutRoute path={paths.signup} component={Signup} />
        <LoggedOutRoute path={paths.login} component={Login} />

        <RootPath path={paths.root} />
      </Switch>
    </Router>
  )
}

function RootPath({ ...props }) {
  const { isAuthenticated } = useContext(AuthContext)

  return isAuthenticated ? (
    <Route {...props} component={Browse} />
  ) : (
    <Route {...props} component={Login} />
  )
}

function LoggedOutRoute({ ...props }) {
  const { isAuthenticated } = useContext(AuthContext)
  return isAuthenticated ? (
    <Redirect
      to={{
        pathname: paths.root,
      }}
    />
  ) : (
    <Route {...props} />
  )
}

function AuthenticatedRoute({ ...props }) {
  const { isAuthenticated } = useContext(AuthContext)

  return isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: paths.root,
      }}
    />
  )
}

export default {
  Routes,
  paths,
}
