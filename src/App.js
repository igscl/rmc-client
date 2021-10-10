import React, {useEffect, useReducer} from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Actions from './components/Actions'
import Action from './components/Action'
import actionData from './data/post_data'
import Nav from './components/Nav'
import NewAction from './components/NewAction'
import EditAction from './components/EditAction'
import stateReducer from './config/stateReducer'
import { StateContext } from './config/store'

const App = () => {

  const initialState = {
    actionsData: [],
    loggedInUser: null
  }

  // const [actions, setActions] = useState([])
  const [store,dispatch] = useReducer(stateReducer,initialState)
  const {actionsData, loggedInUser} = store


  useEffect(() => {
    dispatch({
      type: "setActions",
      data: actionData
    })
},[])

  // Returns a single post based on the id provided
  function getActionFromId(id) {
  return actionsData.find((action) =>  action._id === parseInt(id))
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
      <StateContext.Provider value ={{store, dispatch}} >
      <BrowserRouter>
      <Nav />
        <h1>Hello!</h1>
        <Route exact path="/" component={Actions} />
        <Route exact path="/actions/:id" render={(props) => <Action {...props} action={getActionFromId(props.match.params.id)} showControls deleteAction={deleteAction}/> } />
        <Route exact path="/actions/new" component={NewAction}/>
        <Route exact path="/actions/edit/:id" render={(props) => <EditAction {...props} updateAction={updateAction} action={getActionFromId(props.match.params.id)}/> }/>


      </BrowserRouter>
      </StateContext.Provider>
    </div>
  )
}

export default App
