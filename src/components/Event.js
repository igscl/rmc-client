import React from "react"
// import {Link} from 'react-router-dom'
// import { useGlobalState } from "../config/store"
// import moment from 'moment'

const Event = ({event, showControls, history}) => {
    // const { store, dispatch } = useGlobalState()
    // const {eventsData} = store


    if(!event) return null

    // const linkStyles = {
    //     textDecoration: 'none',
    //     color: 'black' 
    // }
    // const buttonStyles = {
    //     margin: '.5em',
    //     fontSize: '1em'
    // }

    // const lineStyles = {
    //     whiteSpace: 'pre-line',
    // }




const {name, event_date, description, url} = event

    return (
        <>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{name}</h3>
        {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">{name}</p> */}
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Cuando</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{event_date}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Tema</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{description}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Link Zoom</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <a href= {url} target="_blank" rel="noreferrer">{url}</a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
        </>
    )

            }

export default Event