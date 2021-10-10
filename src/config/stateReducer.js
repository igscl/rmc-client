function stateReducer(state, operation) {
    switch(operation.type) {
        case "setActions": {
            return {
                ...state,
                actionsData: operation.data
            }
        }
        case "setLoggedInUser": {
            return {
                ...state,
                loggedInUser: operation.data
            }
        }
        default: 
            return state
    }
}

export default stateReducer