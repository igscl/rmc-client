import React, {useState} from "react";
import { useGlobalState } from "../config/store";
import { setUserInLocalStorage, registerUser } from "../services/authServices";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
        setUserInLocalStorage(userDetails.username)
        registerUser(userDetails)
        .then(response => {
            dispatch({
                type: "setLoggedInUser",
                data: userDetails.username
            })
            dispatch({
                type: "setLoggedInUserIsAdmin",
                data: response.user.isAdmin
            })
            history.push("/profile")
        })
        .catch(error => {
            setErrorMessage("Something went wrong, try changing your username");
        })
    }

    
    return (

        <Container>
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
    </Container >
    )

}
export default Register