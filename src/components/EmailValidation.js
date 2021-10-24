import React, { useEffect, useState } from "react";
import { validateUser } from "../services/authServices";
import { useGlobalState } from "../config/store";
import Login from "./Login";
import { withRouter } from 'react-router-dom'

const EmailValidation = ({ token }) => {
    const { store } = useGlobalState();
    const { loggedInUser } = store

    const [verified, setVerified] = useState(false)

    useEffect(() => {
        let isMounted = true
        if (verified === false) {
            loggedInUser &&
                validateUser(token).then((response) => {
                    if (isMounted) {
                        console.log("Validating user:", response)
                        setVerified(response.is_verified)
                    }
                })
            return () => { isMounted = false }
        }
    }, [loggedInUser, token, verified])

    return (
        <div>
            {loggedInUser ? (
                <div className="bg-white-50">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            {verified ? (<>
                                <span className="block">Tu email ha sido confirmado</span>
                            </>):(<>
                                
                            </>)}
                        </h2>
                    </div>
                </div>

            ) : (
                <Login redirectPath={`/`} />
            )}

        </div>
    )

}

export default withRouter(EmailValidation)