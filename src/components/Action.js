import React from "react"
import {Link} from 'react-router-dom'
import {removeAction} from '../services/actionServices'
import { useGlobalState } from "../config/store"
import moment from 'moment'

const Action = ({action, showControls, history}) => {
    const { store, dispatch } = useGlobalState()
    const {actionsData} = store


    // console.log(action)
    if(!action) return null

    const linkStyles = {
        textDecoration: 'none',
        color: 'black' 
    }
    const buttonStyles = {
        margin: '.5em',
        fontSize: '1em'
    }

    const lineStyles = {
        whiteSpace: 'pre-line',
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

    return (
        <>
        <div>
            <Link style={linkStyles} to={`/actions/${action._id}`}>
            <h1>{title}</h1>
            <p>{moment(create_date).format('MMMM Do, h:mm a')}</p>
            <p style={lineStyles}>{actions}</p>
            </Link>
            {showControls && (
            <>
                <ul>
                {files.map((item,i) => 
                <li key={`${item}`}>
                    <a href={`http://localhost:3009/actions/upload/${item}`} target="_blank" rel="noreferrer" download> 
                    Archivo adjunto {i+1}
                    </a>
                    </li>)}
                </ul>
            
            
                <div>
                    <button style={buttonStyles} onClick={handleDelete}>Delete</button>
                    <button style={buttonStyles} onClick={handleEdit}>Edit</button>
                </div>
            </>
            )}
        </div>
        </>
    )

}

export default Action