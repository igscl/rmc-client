function stateReducer(state, action) {
    switch(action.type) {
        case "setActions": {
            return {
                ...state,
                actionsData: action.data
            }
        }
        case "setNodes": {
            return {
                ...state,
                nodesData: action.data
            }
        }
        case "addAction": {
            return {
                ...state,
                actionsData: action.data
            }
        }
        case "addNode": {
            return {
                ...state,
                nodesData: action.data
            }
        }
        case "setUpload": {
            return {
                ...state,
                uploadData: action.data
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
        case 'setLeader': {
			return {
				...state,
				leader: action.data
			}
        }
        case 'setEvents': {
			return {
				...state,
				eventsData: action.data
			}
        }
        case 'usersCount': {
			return {
				...state,
				usersCount: action.data
			}
        }
        case 'nodesCount': {
			return {
				...state,
				nodesCount: action.data
			}
        }
        case 'updatedAction': {
			return {
				...state,
				actionsData: action.data
			}
        }
        default: 
            return state
    }
}

export default stateReducer