import React from "react"
import {Link} from 'react-router-dom'

const Action = ({action, showControls, history, deleteAction}) => {
    if(!action) return null

    const linkStyles = {
        textDecoration: 'none',
        color: 'black' 
    }
    const buttonStyles = {
        margin: '.5em',
        fontSize: '1em'
    }

    const {title, modified_date, actions} = action

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

    return (
        <div>
            <Link style={linkStyles} to={`/actions/${action._id}`}>
            <h1>{title}</h1>
            <p>{modified_date.toLocaleString()}</p>
            <p>{actions}</p>
            {showControls && (
                <div>
                    <button onClick={handleDelete}>Delete</button>
                    <button style={buttonStyles} onClick={handleEdit}>Edito</button>
                </div>
            )}
            </Link>
        </div>
    )

}

export default Action