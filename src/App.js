import './App.css'
import React, { useState, useEffect } from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import ItemsList from './components/ItemsList'
import Item from './components/Item'
import Home from './components/Home'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'

import data from './data'

const fetchData = () => {
  return Promise.resolve({ success: true, data })
}

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData().then((res) => setData(res.data))
  }, [])

  return (
    <div className='app'>
      <nav>
        <h1>Market Place</h1>
        <div class='nav-links'>
          <Link to='/'>Home</Link>
          <Link to='/items-list'>Shop</Link>
          <Link to='/log-in'>Log In</Link>
          <Link to='/sign-up'>Sign Up</Link>
        </div>
      </nav>

      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/items-list'>
          <Item items={data} />
        </Route>
        <Route path='/items-list'>
          <ItemsList items={data} />
        </Route>
        <Route path='/log-in'>
          <Login />
        </Route>
        <Route path='/sign-up'>
          <Signup />
        </Route>
      </Switch>
    </div>
  )
}

export default App
