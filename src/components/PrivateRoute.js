import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useGlobalState } from '../config/store'

const PrivateRoute = ({ component: Component, options, ...rest }) => {

	const { store } = useGlobalState()
	const { loggedInUser, isLoading } = store

  return (
    <Route
      {...rest}
      render={(privateRouteProps) => {
        return (isLoading || loggedInUser) ? (
          <Component {...privateRouteProps} {...options}/>
        ) : (
            <Redirect to="/users/login" />
        )
      }}
    />
  )
}

export default PrivateRoute