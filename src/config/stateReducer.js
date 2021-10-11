function stateReducer(state, action) {
    switch(action.type) {
        case "setActions": {
            return {
                ...state,
                actionsData: action.data
            }
        }
        case "setLoggedInUser": {
            return {
                ...state,
                loggedInUser: action.data
            }
        }
        case 'setAdminUser': {
			return {
				...state,
				adminUser: action.data
			}
        }
        default: 
            return state
    }
}

export default stateReducer