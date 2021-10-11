import api from "../config/api"

export function getUserFromLocalStorage() {
    return localStorage.getItem("loggedInUser")
}

export function setUserInLocalStorage(user) {
    user ? localStorage.setItem("loggedInUser", user)
         : localStorage.removeItem("loggedInUser")
}

export function getAdminFromLocalStorage() {
    return localStorage.getItem("adminUser")
}

export function setAdminInLocalStorage(admin) {
    admin ? localStorage.setItem("adminUser", admin)
         : localStorage.removeItem("adminUser")
}

export async function userAuthenticated() {
    // call to server to login user
    // return user info if successful and error if not
    const response = await api.get("/users/user")
    console.log("got user back from server", response) 
    return response.data
}

export async function loginUser(userInfo) {
    // call to server to login user
    // return user info if successful and error if not
    const response = await api.post("/users/login", userInfo)
    console.log("got user back from server", response) 
    return response.data
}

export async function registerUser(userInfo) {
    // call to server to register user
    try {
        const response = await api.post("/users/register", userInfo)
        console.log("got user back from server", response)
        return response.data
    }
    catch (error) { 
        console.log("got error", error)
        throw(error)
    }
}

// // Get loggedInUser from localStorage
// export function getLoggedInUser() {
// 	return localStorage.getItem('loggedInUser');
// }

// export function getAdminUser() {
// 	return localStorage.getItem('adminUser');
// }