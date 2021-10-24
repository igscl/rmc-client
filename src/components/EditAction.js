import React from 'react'
import { useState, useEffect } from 'react'
import {withRouter} from 'react-router-dom'
import { editAction } from '../services/actionServices'
import { useGlobalState } from '../config/store'
import api from '../config/api'


const EditAction = ({history, updateAction, action}) => {

    const {store,dispatch} = useGlobalState()
    const {actionsData} = store

    const initialFormState = {
        title: "",
        actions: "",
        files:[]
    }
    const [formState,setFormState] = useState(initialFormState)
    const [file, setFile] = useState()

    async function postImage({image}) {
        const formData = new FormData();
        formData.append("image", image)
        // formData.append("description", description)
      
        const result = await api.post('/actions/upload', formData, { headers: {'Content-Type': 'multipart/form-data'}})
        console.log("RESULT", result)
        return result.data
      }

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setFormState({
            ...formState,
            [name]: value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setClick(true)
        const newAction = {
            _id: action._id,
            title: formState.title,
            modified_date: new Date(),
            actions: formState.actions,
            files: action.files
        }

        // img upload
        if (file){
            const result = await postImage({image: file})
            console.log("RESULT2", result)
            newAction.files.push([file.name, result.file])
        }
        // img up end

        editAction(newAction).then((modifiedAction) =>{
            const otherActions = actionsData.filter((action) => action._id !== newAction._id)
            dispatch({
                type: "updatedAction",
                data: [modifiedAction, ...otherActions]
            })
        })
        history.push(`/actions/${action._id}`)
    }

    //img upload begin
    const fileSelected = event => {
        const file = event.target.files[0]
            setFile(file)
            console.log("FILEEEE",file)
        }
//img upload end

    useEffect(() => {
        // Set the formState to the fields in the post after mount and when post changes
        console.log("edit useEffect")
        action && setFormState({
            title: action.title,
            actions: action.actions,
        })
    },[action])




    // const divStyles = {
    //     display: "grid",
    //     width: "100vw"
    // }
    // const inputStyles = {
    //     width: "70vw",
    //     margin: ".5em"
    // }
    // const labelStyles = {
    //     fontSize: "1.2em"
    // }
    // const textAreaStyles = {
    //     height: "200px",
    //     margin: ".5em",
    //     width: "70vw"
    // }
    const [click, setClick] = useState(false)


    return (
        <>
        <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form id="newActionForm2" onSubmit={handleSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    {/* <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                        Link Invitación
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          http://
                        </span>
                        <input
                          type="text"
                          name="company-website"
                          id="company-website"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="www.example.com"
                        />
                      </div>
                    </div> */}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="Title" className="block text-sm font-medium text-gray-700">
                        Título
                      </label>
                      <input
                        required
                        onChange={handleChange}
                        value={formState.title}
                        type="text"
                        name="title"
                        id="title"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Descripción
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="actions"
                        value={formState.actions}
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        onChange={handleChange}
                        // defaultValue={''}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Breve descripción de las actividades de la semana.
                      No puedes borrar el archivo adjunto, pero si puedes adjuntar otro.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Adjuntar Archivo</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Elegir Archivo</span>
                            <input onChange={fileSelected} id="file-upload" name="file-upload" type="file" accept="image/* ,.pdf" className="sr-only" />
                          </label>
                          <p className="pl-1">para subir</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF, PDF hasta 10MB</p>
                        
                        {file ? (
                            <p className="text-xs text-gray-500">{file.name}</p>
                        
                        ):(<></>
                        )}
                       
                        
                      </div>
                    </div>
                  </div>
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700">Photo</label>
                    <div className="mt-1 flex items-center">
                      <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <button
                        type="button"
                        className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Agregar Foto
                      </button>
                    </div>
                  </div> */}

                  
                 
      
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit" 
                    disabled={click}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </>


    {/* <form id="editActionForm" onSubmit={handleSubmit}>
        <div style={divStyles}>
        <label style={labelStyles}>Title</label>
        <input style={inputStyles} required type="text" name="title" value={formState.title} onChange={handleChange}></input>
        </div>
        <div style={divStyles}>
        <label style={labelStyles}>Actions</label>
        <textarea form="editActionForm" required name="actions" style={textAreaStyles} value={formState.actions} onChange={handleChange}></textarea>
        </div>
        <input type="submit" value="Update action"></input>
    </form>  */}
    </>
    )
}

export default withRouter(EditAction)
