import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Actions from './components/Actions'
import Action from './components/Action'
import actionData from './data/post_data'
import Nav from './components/Nav'
import NewAction from './components/NewAction'

const App = () => {
  const [actions, setActions] = useState([])

  // Returns a single post based on the id provided
  function getActionFromId(id) {
  return actions.find((action) =>  action._id === parseInt(id))
  }
  //add an action to Actions
  function addAction(action) {
    setActions([...actions, action])
  }
  
  function getNextId(){
    const ids = actions.map((action) => action._id)
    return ids.sort()[ids.length-1] + 1
  }

  function deleteAction(id) {
    const updatedActions = actions.filter((action) => action._id !== parseInt(id))
    setActions(updatedActions)
}

  useEffect(() => {
    setActions(actionData)
  },[])

  return (
    <div >
      <BrowserRouter>
      <Nav />
        <h1>Hello!</h1>
        <Route exact path="/" render={(props) => <Actions {...props} actionData={actions} /> } />
        <Route exact path="/actions/:id" render={(props) => <Action {...props} action={getActionFromId(props.match.params.id)} showControls deleteAction={deleteAction}/> } />
        <Route exact path="/actions/new" render={(props) => <NewAction {...props} addBlogPost={addAction} nextId={getNextId()}/> }/>

      </BrowserRouter>
    </div>
  )
}

export default App
