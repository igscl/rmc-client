function stateReducer(state, action) {
    switch(action.type) {
        case "setActions": {
            return {
                ...state,
                actions: action.data
            }
        }
        case "setLoggedInUser": {
            return {
                ...state,
                loggedInUser: action.data
            }
        }
        default: 
            return state
    }
}

export default stateReducer