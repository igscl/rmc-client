import React from "react"
import {Link} from 'react-router-dom'
import {removeAction} from '../services/actionServices'
import { useGlobalState } from "../config/store"

const Action = ({action, showControls, history}) => {
    const { store, dispatch } = useGlobalState()
    const {actionsData} = store


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
        removeAction(action._id)
        .then(() => {
            const updatedActions = actionsData.filter(
                (event) => event._id !== action._id
            );
            dispatch({
                type: 'setActions',
                data: updatedActions,
            });
            history.push('/');
        })
        .catch((error) => {
            console.log('Failed to delete action', error);
        })
}
    
    // Handle the edit button
    function handleEdit(event) {
        event.preventDefault()
        history.push(`/actions/edit/${action._id}`)
    }

    const {title, create_date, actions, files} = action
    console.log("here I am",title)
    console.log(files[0])

    return (
        <div>
            <Link style={linkStyles} to={`/actions/${action._id}`}>
            <h1>{title}</h1>
            <p>{create_date.toLocaleString()}</p>
            <p>{actions}</p>
            </Link>
            <p>{files.map((item,i) => <a href={`http://localhost:3009/actions/upload/${item}`}> <li key={i}>Archivo adjunto {i+1}</li></a>)}</p>
            {showControls && (
                <div>
                    <button style={buttonStyles} onClick={handleDelete}>Delete</button>
                    <button style={buttonStyles} onClick={handleEdit}>Edit</button>
                </div>
            )}
        </div>
    )

}

export default Action