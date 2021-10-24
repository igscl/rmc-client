import axios from 'axios'

console.log("Running in environment", process.env.REACT_APP_ENDPOINT)
// Create an axios instance
export default axios.create({
  baseURL: 'https://red-mundial-rmc.herokuapp.com/',
  // process.env.REACT_APP_ENDPOINT || 'http://localhost:3009',
  timeout: 50000,
  withCredentials: true
})