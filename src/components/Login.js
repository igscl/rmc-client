import React, {useState} from 'react'
import { useGlobalState } from '../config/store'
import { getUserFromLocalStorage, 
    getAdminFromLocalStorage, 
    setAdminInLocalStorage,
    setUserInLocalStorage } from '../services/authServices'
import { loginUser } from '../services/authServices'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


// const Login = (props) => {
//     const {handleLogin, history} = props
const Login = ({history}) => {
    
	const initialFormState = {
        username: "",
        password: ""
    } 

    const [errorMessage, setErrorMessage] = useState(null);
	const [userDetails,setUserDetails] = useState(initialFormState);
    const {dispatch} = useGlobalState()

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
            console.log("ADMIN?",response.is_admin)
            console.log("FROM LOGIN USER",response)
            dispatch({
                type: "setLoggedInUser",
                data: getUserFromLocalStorage()
            })
			dispatch({
				type: 'setAdminUser',
				data: getAdminFromLocalStorage(),
			});

            history.push("/")            
			}).catch((error) => {
				console.log(`An error occurred authenticating: ${error}`)
				setErrorMessage("Login failed. Please check your username and password");

			})		
    }
		
  
    return (
        <>
        <Container>
        <p></p>
        <Row className="justify-content-center">
            <Col className="col-md-6">
                <Form data-cy="login-form" onSubmit={handleSubmit}>
                    <h2 className="center">Login</h2>
                    {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control data-cy="username" required type="text" value={userDetails.username} name="username" placeholder="Enter a username" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control data-cy="password" required type="password" value={userDetails.password}  name="password" placeholder="Enter a password" onChange={handleChange}/>
                    </Form.Group>
                    <Button data-cy="login-button" type="submit" value="Login" className="btn btn-dark">Login</Button>
                </Form>
            </Col>
        </Row>
    </Container >
    </>
    )
}
export default Login