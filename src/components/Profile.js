import React, { useEffect, useState } from "react"
import { viewMyNodeMember, viewMyNodeLeader } from "../services/nodeServices";
import { useGlobalState } from "../config/store";
import NodeMember from "./NodeMember";
import NodeLeader from "./NodeLeader";

const Profile = () => {
    const { store } = useGlobalState();
    const { loggedInUser } = store
    const [userNodeLeader, setUserNodeLeader] = useState([])
    const [userNodeMember, setUserNodeMember] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        console.log("profile useEffect")
        viewMyNodeLeader().then((response) => {
            setUserNodeLeader(response)
            console.log("LEADER", response)
        })
        viewMyNodeMember().then((response) => {
            setUserNodeMember(response)
            console.log("MEMBER", response)
        })
        setIsLoading(false)
    }, [loggedInUser])

    return (
        isLoading ? <></> : 
        <>
            {userNodeLeader.sort((a, b) => b.name - a.name).map((node) =>
                <NodeLeader key={node._id} node={node}/>
            )}


            {userNodeMember.sort((a, b) => b.name - a.name).map((node) =>
                <NodeMember key={node._id} node={node}/>
            )}

        </>
    )

}



export default Profile