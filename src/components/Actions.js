import React from 'react'
import Action from './Action'
import { useGlobalState } from '../config/store'
import moment from 'moment'

const Actions = () => {
    const {store} = useGlobalState()
    const {actionsData} = store
    return(
        <div>
            {actionsData.sort((a,b) => moment(b.create_date).format('X')-moment(a.create_date).format('X')).map((action) => <Action key={action._id} action={action} />)} 
        </div>
    )
}

export default Actions