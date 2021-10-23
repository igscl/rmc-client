import api from "../config/api"

// Returns all actions from the server
export async function getAllNodes() {
    const response = await api.get("/nodes")
    console.log("getAllNodes",response.data)
    return response.data
}


export async function joinNode(token) {
    const response = await api.get(`/nodes/join?invitation=${token}`)
    console.log("joined this node:",response.data)
    return response.data
}

export async function exitNode() {

}

//add a node
export async function addNode(newNode) {
    const response = await api.post("/nodes", newNode)
    console.log("asdfasdfasdf",response.data)
    return response.data
}

export async function viewMyNodeLeader(id) {
    const response = await api.get(`/nodes?leader=leader`)
    // console.log("Leader of:",response.data)
    return response.data
}

export async function viewMyNodeMember() {
    const response = await api.get(`/nodes?members=member`)
    // console.log("Leader of:",response.data)
    return response.data
}

export async function nodesCount() {
    return api.get('/nodes/count')
}