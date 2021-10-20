import React from "react"
import {Link} from 'react-router-dom'
import { useGlobalState } from "../config/store"
import moment from 'moment'

const Event = ({event, showControls, history}) => {
    const { store, dispatch } = useGlobalState()
    const {eventsData} = store


    if(!event) return null

    const linkStyles = {
        textDecoration: 'none',
        color: 'black' 
    }
    const buttonStyles = {
        margin: '.5em',
        fontSize: '1em'
    }

    const lineStyles = {
        whiteSpace: 'pre-line',
    }




const {name, date, description} = event

    return (
        <div>
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
        </div>
    )

            }

export default Event