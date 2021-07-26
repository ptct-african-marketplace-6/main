import './App.css';
import React, { useState, useEffect } from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import ItemsList from './components/ItemsList'
import Item from './components/Item'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import ItemForm from './components/ItemForm'

import data from './data'

const fetchData = () => {
  return Promise.resolve({ success: true, data })
}

function App() {

  const [data, setData] = useState([])

  useEffect(() => {
    fetchData().then(res => setData(res.data))
  }, [])

  return (
    <div className="app">
      <div className="container-fluid">
        <div className="row d-flex align-items-center">
          <div className="col-md-6 col-12 title-container">
            <h1>Market Place</h1>
          </div>
          <div className="col-md-6 col-12">
            <nav>
              <div className="nav-links d-flex justify-content-evenly align-items-center">
                <Link to="/">Home</Link>
                <Link to="/items-list">Shop</Link>
                <Link to="/item-form">Sell</Link>
                <Link to="/log-in">Log In</Link>
                <Link to="/sign-up">Sign Up</Link>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <Switch>

        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/items-list/:itemID">
          <Item items={data}/>
        </Route>
        <Route path="/items-list">
          <ItemsList items={data}/>
        </Route>
        <Route path="/item-form">
          <ItemForm />
        </Route>
        <Route path="/log-in">
          <Login />
        </Route>
        <Route path="/sign-up">
          <Signup />
        </Route>

      </Switch>

    </div>
  );
}

export default App;
