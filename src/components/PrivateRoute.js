import React from 'react'
import Login from './Login'
import { Redirect, Route } from 'react-router-dom'
import { useGlobalState } from '../config/store'

const PrivateRoute = ({ component: Component, options, ...rest }) => {

	const { store } = useGlobalState()
	const { loggedInUser } = store

  return (
    <Route
      {...rest}
      render={(privateRouteProps) => {
        return loggedInUser ? (
          <Component {...privateRouteProps} {...options}/>
        ) : (
            <Redirect to="/users/login" />
        )
      }}
    />
  )
}

export default PrivateRoute