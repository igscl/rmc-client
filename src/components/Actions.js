import React from 'react'
import Action from './Action'
import { useGlobalState } from '../config/store'

const Actions = () => {
    const {store} = useGlobalState()
    const {actionsData} = store
    return(
        <div>
            {actionsData.sort((a,b) => b.modified_date - a.modified_date).map((action) => <Action key={action._id} action={action} />)} 
        </div>
    )
}

export default Actions