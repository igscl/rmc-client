import api from "../config/api"

// Returns all actions from the server
export async function joinNode() {

}

export async function exitNode() {

}

export async function createNode() {

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