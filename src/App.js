import React, { useState, useEffect } from 'react'
import { Route, Link, Switch, useHistory } from 'react-router-dom'
import { connect } from "react-redux";

import ItemsList from './components/ItemsList'
import Item from './components/Item'
import Home from './components/Home'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import ItemForm from './components/ItemForm'
import axiosWithAuth from './common/helpers/axiosWithAuth';
import InnerNavbar from './components/InnerNavbar';
import { fetchItems } from './common/actions/itemActions'
import './App.css';


function App(props) {
  const { push } = useHistory();
  const [data, setData] = useState([])

  // const userInfo = [
  //   {
  //     token: localStorage.getItem("token"),
  //     userID: localStorage.getItem("userID"),
  //     isOwner: localStorage.getItem("isOwner"),
  //     username: localStorage.getItem("username")
  //   }
  // ];


  useEffect(() => { props.fetchItems(); }, []);

  console.log(data)
  console.log(props.items)
  // useEffect(() => {
  //   axiosWithAuth()
  //     .get('items')
  //     .then(res => {
  //       // console.log(res.data);
  //       setData(res.data)
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }, []);
  
  if (props.isLoading) {
      return <><h2>Loading items...</h2></>
  } 

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem("userID");
    localStorage.getItem("isOwner");
    console.log("You have been logged out!");
    alert("You have logged out successfully!");
    push('/');
  };
  
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
                <Link to="/" onClick={logout}>Logout</Link>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div>
        {
          localStorage.getItem('token') && 
            <InnerNavbar items={props.items}/>
        }
      </div>

      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path="/items-list/:itemID">
          <Item items={props.items}/>
        </Route>
        <Route path='/items-list'>
          <ItemsList items={props.items} />
        </Route>
        <Route path="/item-form">
          <ItemForm />
        </Route>
        <Route path="/log-in">
          <Login />
        </Route>
        <Route path='/sign-up'>
          <Signup />
        </Route>
      </Switch>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    isLoading: state.isLoading,
  }
}

export default connect(mapStateToProps, {fetchItems})(App);
// export default App;