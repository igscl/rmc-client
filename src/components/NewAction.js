import React from 'react'
import { useState } from 'react'
import {withRouter} from 'react-router-dom'
import { useGlobalState } from '../config/store'
import api from '../config/api'
import { addAction } from '../services/actionServices'


const NewAction = ({history}) => {
    const {store,dispatch} = useGlobalState()
    const {actionsData} = store


    const initialFormState = {
        title: "",
        actions: ""
    }

    // const [errorMessage, setErrorMessage] = useState(null)
    const [formState,setFormState] = useState(initialFormState)

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setFormState({
            ...formState,
            [name]: value
        })
    }

//image upload begin
    const [file, setFile] = useState()
    const [click, setClick] = useState(false)

    async function postImage({image}) {
        const formData = new FormData();
        formData.append("image", image)
        // formData.append("description", description)
      
        const result = await api.post('/actions/upload', formData, { headers: {'Content-Type': 'multipart/form-data'}})
        console.log("RESULT", result)
        return result.data
      }

// img upload end
    async function handleSubmit(event) {
        event.preventDefault()
        setClick(true)
        console.log("BEFORE",click)
        // if (click) {
        //     console.log("already uploading")
        //     return null
        // }
        const newAction = {
            title: formState.title,
            actions: formState.actions,
            files: []
        }
        //img upload begin
        if (file){
            const result = await postImage({image: file})
            console.log("RESULT2", result)
            newAction.files.push(result.file)
        }
        //img upload end
        console.log("NA",newAction)
        addAction(newAction).then((newAction) => {
            const otherActions = actionsData.filter((action) => action._id !== newAction._id)
            dispatch({
                type: "addAction",
                data: [newAction, ...otherActions]
            })
        history.push(`/actions/${newAction._id}`)
    })}
//img upload begin
      const fileSelected = event => {
        const file = event.target.files[0]
            setFile(file)
            console.log("FILEEEE",file)
        }
//img upload end

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
        <>
    <form id="newActionForm" onSubmit={handleSubmit}>
        {/* upload image begin */}
        <input onChange={fileSelected} type="file" accept="image/* ,.pdf"></input>
        {/* upload image end */}
        <div style={divStyles}>
        <label style={labelStyles}>Title</label>
        <input style={inputStyles} required type="text" name="title" placeholder="Enter a title" onChange={handleChange}></input>
        </div>
        <div style={divStyles}>
        <label style={labelStyles}>Actions</label>
        <textarea form="newActionForm" required name="actions" style={textAreaStyles} placeholder="Enter actions here" onChange={handleChange}></textarea>
        </div>
        <button type="submit" value="Add action" disabled={click}>Submit!</button>
    </form>
    </>

    )
}

export default withRouter(NewAction)
