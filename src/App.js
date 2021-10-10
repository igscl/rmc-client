import React, {useEffect, useReducer} from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Actions from './components/Actions'
import Action from './components/Action'
import actionData from './data/post_data'
import Nav from './components/Nav'
import NewAction from './components/NewAction'
import EditAction from './components/EditAction'
import stateReducer from './config/stateReducer'

const App = () => {

  const initialState = {
    actions: [],
    loggedInUser: null
  }

  // const [actions, setActions] = useState([])
  const [store,dispatch] = useReducer(stateReducer,initialState)
  const {actions, loggedInUser} = store


  useEffect(() => {
    dispatch({
      type: "setActions",
      data: actionData
    })
},[])

  // Returns a single post based on the id provided
  function getActionFromId(id) {
  return actions.find((action) =>  action._id === parseInt(id))
  }
  //add an action to Actions
  function addAction(action) {
    dispatch({
      type: "setActions",
      data: [...actions, action]
    })
  }
  
  function getNextId(){
    const ids = actions.map((action) => action._id)
    return ids.sort()[ids.length-1] + 1
  }

  function deleteAction(id) {
    const updatedActions = actions.filter((action) => action._id !== parseInt(id))
    dispatch({
      type: "setActions",
      data: updatedActions
    })
  }

  // Update an action
  function updateAction(updatedAction) {
    const otherActions = actions.filter((action) => action._id !== updatedAction._id)
    dispatch({
      type: "setActions",
      data: [...otherActions, updatedAction]
    })
  }


  return (
    <div >
      <BrowserRouter>
      <Nav />
        <h1>Hello!</h1>
        <Route exact path="/" render={(props) => <Actions {...props} actionData={actions} /> } />
        <Route exact path="/actions/:id" render={(props) => <Action {...props} action={getActionFromId(props.match.params.id)} showControls deleteAction={deleteAction}/> } />
        <Route exact path="/actions/new" render={(props) => <NewAction {...props} addAction={addAction} nextId={getNextId()}/> }/>
        <Route exact path="/actions/edit/:id" render={(props) => <EditAction {...props} updateAction={updateAction} action={getActionFromId(props.match.params.id)}/> }/>


      </BrowserRouter>
    </div>
  )
}

export default App
