import React from 'react'
import { useState } from 'react'
import {withRouter} from 'react-router-dom'
import { useGlobalState } from '../config/store'
import { addEvent } from '../services/eventServices'

const NewEvent = ({history}) => {
    const {store,dispatch} = useGlobalState()
    const {eventsData} = store

    const initialFormState = {
        name: "",
        description: "",
        date: "",
        url: ""
    }

    // const [errorMessage, setErrorMessage] = useState(null)
    const [formState,setFormState] = useState(initialFormState)
    const [click, setClick] = useState(false)

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
        const newEvent = {
            name: formState.name,
            description: formState.name,
            url: formState.url,
            event_date: formState.date
        }

        addEvent(newEvent).then((newEvent) => {
          const otherEvents = eventsData.filter((event) => event._id !== newEvent._id)
          dispatch({
            type: "addEvent",
            data: [newEvent, ...otherEvents]
          })

          history.push(`/events/${newEvent._id}`)
        })}
    



    return (
        <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form id="newEventForm2" onSubmit={handleSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  

                  <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="Title" className="block text-sm font-medium text-gray-700">
                        Nombre de tu Evento
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
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="Title" className="block text-sm font-medium text-gray-700">
                        Breve descripción:
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
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="Date" className="block text-sm font-medium text-gray-700">
                        Fecha:
                      </label>
                      <input
                        required
                        onChange={handleChange}
                        type="text"
                        name="date"
                        id="date"
                        autoComplete="date"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                        Link invitación reunión (reunión de zoom, sólo el link. Ejemplo: https://zoom.us/ABCDE): <br/>
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        {/* <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          Link invitación reunión (reunión de zoom, sólo el link. Ejemplo: https://zoom.us/ABCDE):
                        </span> */}
                        <input
                          type="text"
                          onChange={handleChange}
                          name="url"
                          id="url"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        />
                      </div>
                    </div>
                  </div>


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


    )
}

export default withRouter(NewEvent)
