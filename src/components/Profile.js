import React, {useEffect, useState} from "react"
import { viewMyNodeMember, viewMyNodeLeader } from "../services/nodeServices";
import { useGlobalState } from "../config/store";
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'

const Profile = () => {
    const {store} = useGlobalState();
    const {loggedInUser} = store
    const [userNodeLeader, setUserNodeLeader] = useState([])
    const [userNodeMember, setUserNodeMember] = useState([])


    useEffect(() => {
        console.log("profile useEffect")
        viewMyNodeLeader().then((response) => {
            setUserNodeLeader(response)
            console.log("LEADER",response)
        })
        viewMyNodeMember().then((response) => {
            setUserNodeMember(response)
            console.log("MEMBER",response)
        })
    }, [loggedInUser])

    return (
        <div>
        <h2>Líder de Nodo:</h2>
        <ul>
        {userNodeLeader.sort((a,b) => b.name-a.name).map((node) => 
        <li key={`${node._id}`}>
             {node.name}
             <p>{`Copiar Invitación:`}</p>
             <Form.Group>
                        <Form.Control data-cy="username" required type="text" name="username" defaultValue={node.invitation_token}/>
            </Form.Group>

             {/* <a href={`http://localhost:3009/nodes/join?invitation=${node.invitation_token}`} target="_blank" rel="noreferrer">
             {node.invitation_token}
            </a> */}
        </li>
        )}
        </ul>
        <h2>Miembro de Nodo:</h2>
        <ul>
        {userNodeMember.sort((a,b) => b.name-a.name).map((node) => 
        <li key={`${node.create_date}`}>{node.name}</li>)}
        </ul>
        </div>
    )

}



export default Profile