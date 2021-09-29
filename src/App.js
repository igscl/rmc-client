import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Actions from './components/Actions'
import actionData from './data/post_data'

const App = () => {
  const [actions, setActions] = useState([])

  useEffect(() => {
    setActions(actionData)
  },[])

  return (
    <div >
      <BrowserRouter>
        <h1>Hello!</h1>
        <Route to="/" render={(props) => <Actions {...props} actionData={actions} /> } />
      </BrowserRouter>
    </div>
  )
}

export default App
