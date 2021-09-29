import React from "react";

const Action = ({action}) => {
    if(!action) return null

    const {title, modified_date, actions} = action
    return (
        <div>
            <h1>{title}</h1>
            <p>{modified_date.toLocaleString()}</p>
            <p>{actions}</p>
        </div>
    )

}

export default Action