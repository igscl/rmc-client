import React from 'react'
import Action from './Action'

const Actions = ({actionData}) => {
    return(
        <div>
            {actionData.sort((a,b) => b.modified_date - a.modified_date).map((action) => <Action key={action._id} action={action} />)} 
        </div>
    )
}

export default Actions