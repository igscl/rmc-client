import api from "../config/api"

// Returns all actions from the server
export async function getAllEvents() {
    const response = await api.get("/events")
    console.log("getAllEvents",response.data)
    return response.data
}
