import React from 'react'
import Event from './Event'
import { useGlobalState } from '../config/store'
import moment from 'moment'

const Events = () => {
    const {store} = useGlobalState()
    const {eventsData} = store
    return(
        <div>
            {eventsData.sort((a,b) => moment(b.date).format('X')-moment(a.date).format('X')).slice(0, 2).map((event) => <Event key={event._id} event={event} />)} 
        </div>
    )
}

export default Events