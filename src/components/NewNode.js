import React from 'react'
import { useState } from 'react'
import {withRouter} from 'react-router-dom'
import { useGlobalState } from '../config/store'
import { addNode } from '../services/nodeServices'
import { setLeaderInLocalStorage, editUser, getLeaderFromLocalStorage } from '../services/authServices'

const NewNode = ({history}) => {
    const {store,dispatch} = useGlobalState()
    const {nodesData, leader} = store

    const initialFormState = {
        name: "",
    }

    const userData = {
      can_be_leader: false
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

    const [click, setClick] = useState(false)
    const [link, setLink] = useState("")
    const [message, setMessage] = useState("")

    async function handleSubmit(event) {
        event.preventDefault()
        setClick(true)
        console.log("BEFORE",click)
        const newNode = {
            name: formState.name,

        }

        console.log("NA",newNode)
        getLeaderFromLocalStorage()
        console.log("leader before",leader)
      if (leader) {


        addNode(newNode).then((newNode) => {
          setLink(newNode.invitation_token)
          setLeaderInLocalStorage(false)
          console.log("leader after",leader)
          editUser(userData)
          const otherNodes = nodesData.filter((node) => node._id !== newNode._id)
          dispatch({
            type: "addNode",
            data: [newNode, ...otherNodes]
          })
          dispatch({
            type: "setLeader",
            data: getLeaderFromLocalStorage()
          })
          // history.push(`/nodes/${newNode._id}`)
        })
      } else {
        setMessage("Ya tienes un Nodo líder")
      }
    }



    return (
        <>
        <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form id="newNodeForm2" onSubmit={handleSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  

                  <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="Title" className="block text-sm font-medium text-gray-700">
                        Nombre de tu nuevo Nodo
                      </label>
                      <input
                        required
                        onChange={handleChange}
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="title"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                        Copia esta invitación y compártela con los miembros de tu nuevo nodo. <br/>
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          Link invitación:
                        </span>
                        <input
                          type="text"
                          onChange={handleChange}
                          name="invitation-token"
                          id="invitation-token"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          
                          
                          defaultValue={link}
                          readOnly
                        />
                      </div>
                     {leader ? (<>

                     </>):(<>
                      <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                      {message}
                      </label>
                     </>)}
                    </div>
                  </div>
                  {/* <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Descripción
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder=""
                        onChange={handleChange}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Breve descripción del nodo.
                    </p>
                  </div> */}


                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit" 
                    disabled={click}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Crear Nodo
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
    </>

    )
}

export default withRouter(NewNode)