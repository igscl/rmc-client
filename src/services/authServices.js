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
    console.log("setting admin", admin)
    admin ? localStorage.setItem("adminUser", admin)
         : localStorage.removeItem("adminUser")
}

export function getLeaderFromLocalStorage() {
    console.log("executing function", localStorage.getItem("leader"))
    return localStorage.getItem("leader")
}

export function setLeaderInLocalStorage(leader) {
    leader ? localStorage.setItem("leader", leader)
         : localStorage.removeItem("leader", leader)
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

export async function editUser(userInfo) {
    // call to server to login user
    // return user info if successful and error if not
    const response = await api.put(`/users/user`, userInfo)
    console.log("got user back from server", response) 
    return response.data
}

export async function logoutUser() {
	return api.get('/users/logout');
}

export async function usersCount() {
    return api.get('/users/count')
}

export async function getUserId(id){
    return api.get(`/users/${id}`)
}

// // Get loggedInUser from localStorage
// export function getLoggedInUser() {
// 	return localStorage.getItem('loggedInUser');
// }

// export function getAdminUser() {
// 	return localStorage.getItem('adminUser');
// }