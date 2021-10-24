import React from 'react'
import ActionB from './ActionB'
import { useGlobalState } from '../config/store'
import moment from 'moment'

const Actions = () => {
    const {store} = useGlobalState()
    const {actionsData} = store
    return(
        <>
        <div>
            {/* <h1>Acciones semanales:</h1> */}
            {actionsData.sort((a,b) => moment(b.create_date).format('X')-moment(a.create_date).format('X')).map((action) => <ActionB key={action._id} action={action} linker/>)}
        </div>
        </>
    )
}

export default Actions