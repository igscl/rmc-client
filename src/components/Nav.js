import React from 'react'
import {Link} from 'react-router-dom'
import { useGlobalState } from '../config/store'
import { logoutUser, setAdminInLocalStorage, setUserInLocalStorage } from '../services/authServices'

const Nav = () => {

    const divStyles = {
        display: 'flex',
    }
    const linkStyles = {
        fontSize: '1.2em',
        textDecoration: 'none',
        margin: '.5em' 
    }

    const {store, dispatch} = useGlobalState()
    const {loggedInUser} = store
    
    function handleLogout() {
		setUserInLocalStorage(null)
        setAdminInLocalStorage(false)
		logoutUser()
			.then((response) => {
				console.log('Got back response on logout', response.status);
			})
			.catch((error) => {
				console.log(
					'The server may be down - caught an exception on logout:',
					error
				);
			});
		dispatch({
			type: 'setLoggedInUser',
			data: null,
		});
		dispatch({
			type: 'setAdminUser',
			data: false,
		});
	}

    return (
        <>
        <div style={divStyles}>
                <Link style={linkStyles} to="/">Home</Link>
                        {loggedInUser 
            ? (<>
                <Link style={linkStyles} to="/Profile">Profile</Link>
                <Link style={linkStyles} onClick={handleLogout} to="/">Logout</Link>
                </>)
            : (<>
                <Link style={linkStyles} to="/users/login">Login</Link>
                <Link style={linkStyles} to="/users/register">Register</Link>
                </>)
            }
            <Link style={linkStyles} to="/actions/new">Add an Action</Link>
        </div>
        </>
    )
}

export default Nav