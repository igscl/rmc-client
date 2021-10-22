import React, { useEffect, useState } from "react";
import { joinNode } from "../services/nodeServices";
import { useGlobalState } from "../config/store";
import Login from "./Login";
import {withRouter} from 'react-router-dom'

const Confirmation = ({joinNodeId}) => {
    const {store} = useGlobalState();
    const {loggedInUser} = store

    const [name, setName] = useState()
    useEffect(() => {
        // console.log("profile useEffect")
        loggedInUser &&
        joinNode(joinNodeId).then((response) => {
            // console.log("join node",response)
            setName(response.name)
        })
    }, [joinNodeId, loggedInUser])

    return(
        <div>
            {loggedInUser ? (
                <h2>Joined {name} node</h2>
            ):(
                <Login redirectPath={`/node/join/${joinNodeId}`}/>
            )}
            
        </div>
    )

}

export default withRouter(Confirmation)