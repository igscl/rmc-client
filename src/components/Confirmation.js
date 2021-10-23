import React, { useEffect, useState } from "react";
import { joinNode } from "../services/nodeServices";
import { useGlobalState } from "../config/store";
import Login from "./Login";
import {withRouter} from 'react-router-dom'

const Confirmation = ({joinNodeId}) => {
    const {store} = useGlobalState();
    const {loggedInUser} = store

    const [name, setName] = useState("")
    useEffect(() => {
        if(name === ""){
            loggedInUser &&
            joinNode(joinNodeId).then((response) => {
                console.log("join node",response)
                setName(response.name)
            })
        }
            console.log("running again!")
    }, [loggedInUser])

    return(
        <div>
            {loggedInUser ? (
                <h2>Joined {} node</h2>
            ):(
                <Login redirectPath={`/node/join/${joinNodeId}`}/>
            )}
            
        </div>
    )

}

export default withRouter(Confirmation)