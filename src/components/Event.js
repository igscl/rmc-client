import React from "react"
// import {Link} from 'react-router-dom'
// import { useGlobalState } from "../config/store"
import moment from 'moment'

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




const {name, date, description} = event

    return (
        <>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{name}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Nodo Arca</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Cuando</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{moment(date).format('MMMM Do, h:mm a')}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Tema</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{description}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Link Zoom</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <a href= 'https://zoom.us/j/94353515649?pwd=L3Rlc2I3QmU2YjE5dklpVjQ5eUxzZz09'>https://zoom.us/j/94353515649?pwd=L3Rlc2I3QmU2YjE5dklpVjQ5eUxzZz09</a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
        {/* <div>
            <Link style={linkStyles} to={`/events/${event._id}`}>
            <h1>{name}</h1>
            <p>{moment(date).format('MMMM Do, h:mm a')}</p>
            <p style={lineStyles}>{description}</p>
            </Link>
            {showControls && (
            <>
                <div>
                    <button style={buttonStyles} >Delete</button>
                    <button style={buttonStyles} >Edit</button>
                </div>
            </>
            )}
        </div> */}
        </>
    )

            }

export default Event