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

      <nav>
        <h1>Market Place</h1>
        <div className="nav-links">
          <Link to="/"><button>Home</button></Link>{' '}
          <Link to="/items-list"><button>Shop</button></Link>{' '}
          <Link to="/item-form"><button>Sell</button></Link>{' '}
          <Link to="/log-in"><button>Log In</button></Link>{' '}
          <Link to="/sign-up"><button>Sign Up</button></Link>

        </div>
      </nav>

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
