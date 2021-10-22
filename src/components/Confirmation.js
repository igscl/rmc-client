import React, { useEffect, useState } from "react";
import { joinNode } from "../services/nodeServices";

const Confirmation = (props) => {

    const {joinNodeId} = props
    const [name, setName] = useState()
    useEffect(() => {
        console.log("profile useEffect")
        joinNode(joinNodeId).then((response) => {
            // console.log("join node",response)
            setName(response.name)
        })
    }, [joinNodeId])

    return(
        <div>
            <h2>Joined {name} node</h2>
        </div>
    )

}

export default Confirmation