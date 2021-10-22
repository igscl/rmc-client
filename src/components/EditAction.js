import React from 'react'
import { useState, useEffect } from 'react'
import {withRouter} from 'react-router-dom'


const EditAction = ({history, updateAction, action}) => {

    const initialFormState = {
        title: "",
        actions: ""
    } 
    const [formState,setFormState] = useState(initialFormState)

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setFormState({
            ...formState,
            [name]: value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        const newAction = {
            _id: action._id,
            title: formState.title,
            modified_date: new Date(),
            actions: formState.actions
        }
        updateAction(newAction)
        history.push(`/actions/${action._id}`)
    }

    useEffect(() => {
        // Set the formState to the fields in the post after mount and when post changes
        console.log("edit useEffect")
        action && setFormState({
            title: action.title,
            actions: action.actions,
        })
    },[action])

    const divStyles = {
        display: "grid",
        width: "100vw"
    }
    const inputStyles = {
        width: "70vw",
        margin: ".5em"
    }
    const labelStyles = {
        fontSize: "1.2em"
    }
    const textAreaStyles = {
        height: "200px",
        margin: ".5em",
        width: "70vw"
    }
    return (
    <form id="editActionForm" onSubmit={handleSubmit}>
        <div style={divStyles}>
        <label style={labelStyles}>Title</label>
        <input style={inputStyles} required type="text" name="title" value={formState.title} onChange={handleChange}></input>
        </div>
        <div style={divStyles}>
        <label style={labelStyles}>Actions</label>
        <textarea form="editActionForm" required name="actions" style={textAreaStyles} value={formState.actions} onChange={handleChange}></textarea>
        </div>
        <input type="submit" value="Update action"></input>
    </form> 
    )
}

export default withRouter(EditAction)
