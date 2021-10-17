import React from 'react'
import { useState } from 'react'
import {withRouter} from 'react-router-dom'
import { useGlobalState } from '../config/store'
import api from '../config/api'


const NewAction = ({history}) => {
    const {store,dispatch} = useGlobalState()
    const {actionsData} = store

    //add an action to Actions
    function addAction(action) {
        dispatch({
        type: "setActions",
        data: [...actionsData, action]
        })
    }
    // // add an upload to Actions
    // function addUpload(upload) {
    //     dispatch({
    //     type: "setUpload",
    //     data: [...uploadData, upload]
    //     })
    // }
    
    function getNextId(){
        const ids = actionsData.map((action) => action._id)
        return ids.sort()[ids.length-1] + 1
    }


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
//image upload begin
    const [file, setFile] = useState()
    const [images, setImages] = useState([])

    async function postImage({image, description}) {
        const formData = new FormData();
        formData.append("image", image)
        formData.append("description", description)
      
        const result = await api.post('/actions/upload', formData, { headers: {'Content-Type': 'multipart/form-data'}})
        return result.data
      }
// img upload end
    async function handleSubmit(event) {
        event.preventDefault()
        const nextId = getNextId()
        const newAction = {
            _id: nextId,
            title: formState.title,
            modified_date: new Date(),
            actions: formState.actions
        }
        addAction(newAction)
        //img upload begin
        const result = await postImage({image: file})
        setImages([result.image, ...images])
        //img upload end
        history.push(`/actions/${nextId}`)
    }
//img upload begin
      const fileSelected = event => {
        const file = event.target.files[0]
            setFile(file)
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
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        {/* <input value={description} onChange={e => setDescription(e.target.value)} type="text"></input> */}
        {/* upload image end */}
        <div style={divStyles}>
        <label style={labelStyles}>Title</label>
        <input style={inputStyles} required type="text" name="title" placeholder="Enter a title" onChange={handleChange}></input>
        </div>
        <div style={divStyles}>
        <label style={labelStyles}>Actions</label>
        <textarea form="newActionForm" required name="actions" style={textAreaStyles} placeholder="Enter actions here" onChange={handleChange}></textarea>
        </div>
        <input type="submit" value="Add action"></input>
    </form>
    </>

    )
}

export default withRouter(NewAction)
