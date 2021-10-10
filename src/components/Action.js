import React from "react"
import {Link} from 'react-router-dom'

const Action = ({action, showControls, history, deleteAction}) => {
    if(!action) return null

    const linkStyles = {
        textDecoration: 'none',
        color: 'black' 
    }

    const {title, modified_date, actions} = action

    function handleDelete(event) {
        event.preventDefault()
        deleteAction(action._id)
        history.push("/")
    }

    return (
        <div>
            <Link style={linkStyles} to={`/actions/${action._id}`}>
            <h1>{title}</h1>
            <p>{modified_date.toLocaleString()}</p>
            <p>{actions}</p>
            {showControls && (
                <button onClick={handleDelete}>Delete</button>
            )}
            </Link>
        </div>
    )

}

export default Action