import React from 'react'
import Event from './Event'
import { useGlobalState } from '../config/store'
import moment from 'moment'

const Events = () => {
    const {store} = useGlobalState()
    const {eventsData} = store
    return(
        <div>
            {/* <h1>Próximas reuniones:</h1> */}
            {eventsData.sort((a,b) => moment(b.create_date).format('X')-moment(a.create_date).format('X')).map((event) => <Event key={event._id} event={event} />)} 
        </div>
    )
}

export default Events