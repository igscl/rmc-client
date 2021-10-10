import React from 'react'
import { useState } from 'react'
import {withRouter} from 'react-router-dom'


const NewAction = ({history, addBlogPost, nextId}) => {

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
        const newPost = {
            _id: nextId,
            title: formState.title,
            modified_date: new Date(),
            actions: formState.actions
        }
        addBlogPost(newPost)
        history.push(`/actions/${nextId}`)
    }

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
    <form id="newPostForm" onSubmit={handleSubmit}>
        <div style={divStyles}>
        <label style={labelStyles}>Title</label>
        <input style={inputStyles} required type="text" name="title" placeholder="Enter a title" onChange={handleChange}></input>
        </div>
        <div style={divStyles}>
        <label style={labelStyles}>Actions</label>
        <textarea form="newPostForm" required name="actions" style={textAreaStyles} placeholder="Enter actions here" onChange={handleChange}></textarea>
        </div>
        <input type="submit" value="Add action"></input>
    </form> 
    )
}

export default withRouter(NewAction)
