import api from "../config/api"

// Returns all actions from the server
export async function getAllEvents() {
    const response = await api.get("/events")
    console.log("getAllEvents",response.data)
    return response.data
}

export async function addEvent(newEvent) {
    const response = await api.post("/events", newEvent)
    console.log("This is the new Event", response.data)
    return response.data
}