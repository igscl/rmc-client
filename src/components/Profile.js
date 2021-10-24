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
    const [leaderL, setLeaderL] = useState()
    const [memberL, setMemberL] = useState()

    useEffect(() => {
        console.log("profile useEffect")
        viewMyNodeLeader().then((response) => {
            setUserNodeLeader(response)
            setLeaderL(response.length === 0)
            console.log("LEADER", response.length === 0, response)
        })
        viewMyNodeMember().then((response) => {
            setUserNodeMember(response)
            setMemberL(response.length === 0)
            console.log("MEMBER", response.length === 0, response)
        })
        setIsLoading(false)
    }, [loggedInUser])

    return (
        <>{(leaderL && memberL) ?

            <>

                <div className="bg-white">
                    <div className="max-w-2xl mx-auto py-24 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8 lg:grid-cols-2">
                        <div>
                            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Debes unirte a un Nodo</h2>
                            <p className="mt-4 text-gray-500">
                                Todavía no eres miembro de ningún nodo. <br/> Puedes crear un Nodo o unirte a uno existente pidiendo el link de invitación a tu líder de Nodo.
                            </p>

                        </div>
                    </div>
                </div>



            </>



            :



            <>
                {isLoading ? <></> :
                    <>
                        {userNodeLeader.sort((a, b) => b.name - a.name).map((node) =>
                            <NodeLeader key={node._id} node={node} />
                        )}


                        {userNodeMember.sort((a, b) => b.name - a.name).map((node) =>
                            <NodeMember key={node._id} node={node} />
                        )}

                    </>}


            </>}


        </>
    )

}



export default Profile