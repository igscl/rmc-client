import React, { useEffect, useReducer } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Actions from './components/Actions'
import Events from './components/Events'
import IndexPage from './components/IndexPage'
import Event from './components/Event'
import Profile from './components/Profile'
// import Action from './components/Action'
import ActionB from './components/ActionB'
// import actionData from './data/post_data'
import Nav from './components/Nav'
import NewAction from './components/NewAction'
import EditAction from './components/EditAction'
import stateReducer from './config/stateReducer'
import { StateContext } from './config/store'
import Login from './components/Login'
import Register from './components/Register'
import { getUserFromLocalStorage, getAdminFromLocalStorage, getLeaderFromLocalStorage, usersCount } from './services/authServices'
import { getAllActions } from './services/actionServices'
import { getAllEvents } from './services/eventServices'
import Confirmation from './components/Confirmation'
import { nodesCount, getAllNodes } from './services/nodeServices'
import NewNode from './components/NewNode'
import PrivateRoute from './components/PrivateRoute'

const App = () => {

  const initialState = {
    actionsData: [],
    eventsData: [],
    loggedInUser: null,
    usersCount: [],
    nodesCount: [],
    nodesData: [],
    leader: null,
    adminUser: null
  }

  // const [actions, setActions] = useState([])
  const [store, dispatch] = useReducer(stateReducer, initialState)
  const { actionsData, eventsData, loggedInUser, adminUser, leader} = store


  useEffect(() => {
    console.log("app useEffect")
    dispatch({
      type: 'setLoggedInUser',
      data: getUserFromLocalStorage(),
    });
    dispatch({
      type: 'setAdminUser',
      data: getAdminFromLocalStorage(),
    })
    dispatch({
      type: 'setLeader',
      data: getLeaderFromLocalStorage(),
    })
    console.log("loggedinuser", loggedInUser)
    console.log("adminuser", adminUser)
    console.log("leader!",leader)
    // adminUser &&
    //   dispatch({
    //     type: "setActions",
    //     data: actionData
    //   })

    function fetchNumberOfUsers() {
      usersCount().then((countData) => {
        dispatch({
          type: 'usersCount',
          data: countData
        })
      }).catch((error) => {
        console.log("An error occurred fetching users from the server:", error)
      })

    }

    function fetchNumberOfNodes() {
      nodesCount().then((countData) => {
        console.log("countdata", countData)
        dispatch({
          type: 'nodesCount',
          data: countData
        })
      }).catch((error) => {
        console.log("An error occurred fetching nodes from the server:", error)
      })

    }

    loggedInUser && fetchActions()
    loggedInUser && fetchEvents()
    loggedInUser && fetchNodes()
    loggedInUser && fetchNumberOfUsers()
    loggedInUser && fetchNumberOfNodes()

  }, [loggedInUser, adminUser, leader])


  function fetchActions() {
    getAllActions().then((actionData) => {
      dispatch({
        type: "setActions",
        data: actionData
      })
    }).catch((error) => {
      console.log("An error occurred fetching actions from the server:", error)
    })
  }

  function fetchEvents() {
    getAllEvents().then((eventData) => {
      dispatch({
        type: "setEvents",
        data: eventData
      })
    }).catch((error) => {
      console.log("An error occurred fetching events from the server:", error)
    })
  }

  function fetchNodes() {
    getAllNodes().then((nodesData) => {
      dispatch({
        type: "setNodes",
        data: nodesData
      })
    }).catch((error) => {
      console.log("An error occurred fetching events from the server:", error)
    })
  }


  // Returns a single post based on the id provided
  function getActionFromId(id) {
    console.log("getActionFromId", actionsData)
    return actionsData.find((action) => action._id === id)
  }

  function getEventFromId(id) {
    console.log("getEventFromId", eventsData)
    return eventsData.find((event) => event._id === id)
  }

  function deleteAction(id) {
    const updatedActions = actionsData.filter((action) => action._id !== parseInt(id))
    dispatch({
      type: "setActions",
      data: updatedActions
    })
  }

  // Update an action
  function updateAction(updatedAction) {
    const otherActions = actionsData.filter((action) => action._id !== updatedAction._id)
    dispatch({
      type: "setActions",
      data: [...otherActions, updatedAction]
    })
  }


  return (
    <div >
      {/* {loggedInUser &&
      <img src="http://localhost:3009/actions/upload/1794ea2b2715231d1c80c8fccf01e725" alt="hello" />} */}
      <StateContext.Provider value={{ store, dispatch }} >
        <BrowserRouter>
          <Nav loggedInUser={loggedInUser}/>
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/" component={IndexPage} />
          <PrivateRoute exact path="/events" component={Events} />
          <PrivateRoute exact path="/events/:id" component={(props) => <Event {...props} event={getEventFromId(props.match.params.id)} showControls />} />
          <PrivateRoute exact path="/actions" component={Actions} />
          {/* <Route exact path="/actions/:id" component={(props) => <Action {...props} action={getActionFromId(props.match.params.id)} showControls deleteAction={deleteAction}/> } /> */}
          <PrivateRoute exact path="/actions/:id" component={(props) => <ActionB {...props} action={getActionFromId(props.match.params.id)} showControls deleteAction={deleteAction} />} />
          <PrivateRoute exact path="/actions/new" component={NewAction} />
          <PrivateRoute exact path="/nodes/new" component={NewNode} />
          <PrivateRoute exact path="/actions/edit/:id" component={(props) => <EditAction {...props} updateAction={updateAction} action={getActionFromId(props.match.params.id)} />} />
          <Route exact path="/users/login" component={Login} />
          <Route exact path="/users/register" component={Register} />
          <PrivateRoute exact path="/nodes/join/:id" component={(props) => <Confirmation {...props} joinNodeId={props.match.params.id} />} />


        </BrowserRouter>
      </StateContext.Provider>
    </div>
  )
}

export default App
