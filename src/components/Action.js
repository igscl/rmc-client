import React, {useState, useEffect} from "react"
import {Link} from 'react-router-dom'
import { getAction } from "../services/actionServices"
import { useGlobalState } from "../config/store"

// import { useGlobalState } from "../config/store";

const Action = ({action, showControls, history, deleteAction}) => {
    // const { store } = useGlobalState();
    // const {actionsData} = store

    // const initialState = {
    //     actions: "",
    //     title: ""
    // }

    // const [actionData, setActionData] = useState(initialState)

    // useEffect(() => {
    //     getAction(action).then((result) =>{
    //         setActionData(result)
    //     })
    //     .catch((error) =>{
    //         console.log('An error occurred', error)
    //     })
    // })
    console.log(action)
    if(!action) return null

    const linkStyles = {
        textDecoration: 'none',
        color: 'black' 
    }
    const buttonStyles = {
        margin: '.5em',
        fontSize: '1em'
    }



    function handleDelete(event) {
        event.preventDefault()
        deleteAction(action._id)
        history.push("/")
    }
    // Handle the edit button
    function handleEdit(event) {
        event.preventDefault()
        history.push(`/actions/edit/${action._id}`)
    }

    const {title, create_date, actions} = action
    console.log("here I am",title)

    return (
        <div>
            <Link style={linkStyles} to={`/actions/${action._id}`}>
            <h1>{title}</h1>
            <p>{create_date.toLocaleString()}</p>
            <p>{actions}</p>
            {showControls && (
                <div>
                    <button style={buttonStyles} onClick={handleDelete}>Delete</button>
                    <button style={buttonStyles} onClick={handleEdit}>Edit</button>
                </div>
            )}
            </Link>
        </div>
    )

}

export default Action