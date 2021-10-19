import api from "../config/api"

// Returns all actions from the server
export async function getAllActions() {
    const response = await api.get("/actions")
    console.log(response.data)
    return response.data
}

// export async function getAction(id) {
//     const response = await api.get(`/actions/${id}`)
//     console.log("DATAAAA",response.data)
//     return response.data
// }

export function getAction(actionsData,id) {
    const data =  actionsData.find((action) =>  action._id === id)
    console.log(data)
    return data
}

// Deletes a post on the server
export async function removeAction(id) {
    const response = await api.delete(`/actions/${id}`)
    console.log("response from delete",response)
    return response.data
}

//add an action
export async function addAction(newAction) {
    const response = await api.post("/actions", newAction)
    return response.data
}