import React, { useEffect, useState } from "react";
import { joinNode } from "../services/nodeServices";
import { useGlobalState } from "../config/store";
import Login from "./Login";
import { withRouter } from 'react-router-dom'

const Confirmation = ({ joinNodeId }) => {
    const { store } = useGlobalState();
    const { loggedInUser } = store

    const [name, setName] = useState("")

    useEffect(() => {
        let isMounted = true
        if (name === "") {
            loggedInUser &&
                joinNode(joinNodeId).then((response) => {
                    if (isMounted) {
                        console.log("join node", response)
                        setName(response.name)
                    }
                })
            return () => { isMounted = false }
        }
    }, [loggedInUser, joinNodeId, name])

    return (
        <div>
            {loggedInUser ? (
                <div className="bg-white-50">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            <span className="block">Te uniste a Nodo {name}</span>
                        </h2>
                    </div>
                </div>

            ) : (
                <Login redirectPath={`/node/join/${joinNodeId}`} />
            )}

        </div>
    )

}

export default withRouter(Confirmation)