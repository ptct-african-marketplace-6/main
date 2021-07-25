import React, { useState, useEffect } from 'react'
import { Route, Link, Switch, useHistory } from 'react-router-dom'

import ItemsList from './components/ItemsList'
import Item from './components/Item'
import Home from './components/Home'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import ItemForm from './components/ItemForm'
import { fetchItems } from './common/actions/itemActions';
import axiosWithAuth from './common/helpers/axiosWithAuth';
import InnerNavbar from './components/InnerNavbar';

import './App.css';

function App(props) {
  const { push } = useHistory();
  const [data, setData] = useState([])

  const [user, setUser] = useState([{
    username: localStorage.getItem('username'),
    // user_id: localStorage.getItem("user_id")
  }]);

  useEffect(() => {
    axiosWithAuth()
    // .fetchItems() <--- this action needs more work
      .get('items')
      .then(res => {
        // console.log(res.data);
        setData(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, []);
  if (props.isLoading) {
      return <><h2>Loading items...</h2></>
  } 

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    console.log("You have been logged out!");
    alert("You have logged out successfully!");
    push('/');
  };
  
  return (
    <div className="App">

      <nav>
        <h1>Market Place</h1>
        <div className="nav-links">
          <Link to="/"><button className='w-auto btn btn-success'>Home</button></Link>{' '}
          <Link to="/items-list"><button className='w-auto btn btn-success'>Shop</button></Link>{' '}
          {/* <Link to="/item-form"><button className='w-auto btn btn-success'>Sell</button></Link>{' '} */}
          <Link to="/log-in"><button className='w-auto btn btn-info'>Log In</button></Link>{' '}
          <Link to="/sign-up"><button className='w-auto btn btn-info'>Sign Up</button></Link>{' '}
          <Link to="/" onClick={logout}><button className='w-auto btn btn-danger'>Logout</button></Link>
        </div>
      </nav>

      <div>
        {
          localStorage.getItem('token') && 
          <div>
            <InnerNavbar items={data}/>
          </div>
        }
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
