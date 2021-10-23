import React, {useState} from "react";
import { useGlobalState } from "../config/store";
import { getUserFromLocalStorage, getAdminFromLocalStorage, setUserInLocalStorage, registerUser, setAdminInLocalStorage, getLeaderFromLocalStorage, setLeaderInLocalStorage } from "../services/authServices";
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import { LockClosedIcon } from '@heroicons/react/solid'

const Register = ({history}) => {
    const {dispatch} = useGlobalState()

      //state for controlled form
    const initialFormState = {
        username: "",
        email: "",
        phoneNumber: "+61",
        password: ""
    } 

    const [userDetails,setUserDetails] = useState(initialFormState)
    const [errorMessage, setErrorMessage] = useState(null)
    

    //change handler
    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }
    //submit handler
    function handleSubmit(event) {
        event.preventDefault()
        registerUser(userDetails)
        .then(response => {
            setUserInLocalStorage(response.username)
            setAdminInLocalStorage(response.is_admin)
            setLeaderInLocalStorage(response.can_be_leader)
            console.log("RESPONSE USER!",response)
            dispatch({
                type: "setLoggedInUser",
                data: getUserFromLocalStorage()
            })
            dispatch({
                type: "setAdminUser",
                data: getAdminFromLocalStorage()
            })
            dispatch({
              type: "setLeader",
              data: getLeaderFromLocalStorage()
          })
            history.push("/profile")
        })
        .catch(error => {
            setErrorMessage("Something went wrong, try changing your username");
        })
    }

    
    return (
        
    <>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Regístrate</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="/users/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Ingresa aquí
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
              {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                <label htmlFor="username" className="sr-only">
                Username
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
                <label htmlFor="email-address" className="sr-only">
                Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  value={userDetails.email}
                  onChange={handleChange}
                />
              </div>
              {/* <div>
                <label htmlFor="tel" className="sr-only">
                Username
                </label>
                <input
                  id="tel"
                  name="tel"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Teléfono"
                  value={userDetails.phoneNumber}
                  onChange={handleChange}
                />
              </div> */}
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
                value="Register"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
        {/* <Container>
        <p></p>
        <Row className="justify-content-center">
            <Col className="col-md-6">
                <Form data-cy="login-form" onSubmit={handleSubmit}>
                    <h2 className="center">Register</h2>
                    {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control data-cy="username" required type="text" value= {userDetails.username} name="username" placeholder="Enter a username" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control data-cy="email" required type="email" value= {userDetails.email}  name="email" placeholder="Enter an email" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
    <Form.Label>Phone number (+61 format, no zero at start. If your number is 0400 123 456, then your number is +61400123456</Form.Label>
                        <Form.Control data-cy="phone-number" required type="phone number" value= {userDetails.phoneNumber}  name="phoneNumber" placeholder="Enter a phone number" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control data-cy="password" required type="password" value= {userDetails.password} name="password" placeholder="Enter a password" onChange={handleChange}/>
                    </Form.Group>
                    <Button data-cy="register-button" type="submit" value="Register" className="btn btn-dark">Register</Button>
                </Form>
            </Col>
        </Row>
    </Container > */}
    </>
    )

}
export default Register