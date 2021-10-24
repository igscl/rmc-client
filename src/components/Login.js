import React, { useState } from 'react'
import { useGlobalState } from '../config/store'
import {
  getUserFromLocalStorage,
  getAdminFromLocalStorage,
  setAdminInLocalStorage,
  setUserInLocalStorage,
  getLeaderFromLocalStorage,
  setLeaderInLocalStorage,
  setIsLoading,
  getIsLoading
} from '../services/authServices'
import { loginUser } from '../services/authServices'
import { LockClosedIcon } from '@heroicons/react/solid'



const Login = ({ history, redirectPath }) => {

  const initialFormState = {
    username: "",
    password: ""
  }

  const [errorMessage, setErrorMessage] = useState(null);
  const [userDetails, setUserDetails] = useState(initialFormState);
  const { dispatch } = useGlobalState()

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    setUserDetails({
      ...userDetails,
      [name]: value
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    // Attempt login on server
    loginUser(userDetails).then((response) => {
      setUserInLocalStorage(response.username)
      setAdminInLocalStorage(response.is_admin)
      setLeaderInLocalStorage(response.can_be_leader)
      setIsLoading(false)
      console.log("ADMIN?", response.is_admin)
      console.log("FROM LOGIN USER", response)
      dispatch({
        type: "setLoggedInUser",
        data: getUserFromLocalStorage()
      })
      dispatch({
        type: "setIsLoading",
        data: getIsLoading()
      })
      dispatch({
        type: 'setAdminUser',
        data: getAdminFromLocalStorage()
      });
      dispatch({
        type: 'setLeader',
        data: getLeaderFromLocalStorage()
      });
      history &&
        history.push(redirectPath || "/")
    }).catch((error) => {
      console.log(`An error occurred authenticating: ${error}`)
      setErrorMessage("Login failed. Please check your username and password");

    })
  }


  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Ingresa a tu cuenta</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="/users/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Regístrate
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <label htmlFor="email-address" className="sr-only">
                  Nombre de usuario
                </label>
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Nombre de Usuario"
                  value={userDetails.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                  value={userDetails.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="/#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                value="Login"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>

    </>
  )
}
export default Login