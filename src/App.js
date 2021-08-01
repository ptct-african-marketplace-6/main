import React, { useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { connect } from "react-redux";
import { Container, Nav, Navbar } from 'react-bootstrap';

import ItemsList from './components/ItemsList'
import Item from './components/Item'
import Home from './components/Home'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import EditItem from './components/EditItem'
import InnerNavbar from './components/InnerNavbar';
import { fetchItems } from './common/actions/itemActions'
import './App.css';


function App(props) {
  const { push } = useHistory();

  useEffect(() => { props.fetchItems(); }, []);
  
  if (props.isLoading) {
      return <><h2>Loading Marketplace...</h2></>
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
            <h1>Sauti Market Place</h1>
          </div>
          <div className="col-md-6 col-12">
            <nav>
            <div className="nav-links d-flex flex-column flex-md-row justify-content-evenly align-items-center">
            <Container fluid='sm' className='text-center'>
            <Navbar collapseOnSelect expand="sm">
              <Navbar.Brand className="home-nav-btn py-3 py-md-0" href='/' defaultactivekey="/">HOME</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
              <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link className="nav-btn py-3 py-md-0" href='/items-list'>Shop</Nav.Link>
                <Nav.Link className="nav-btn py-3 py-md-0" href="/log-in">Log In</Nav.Link>
                <Nav.Link className="nav-btn py-3 py-md-0" href="/sign-up">Sign Up</Nav.Link>
                <Nav.Link className="nav-btn py-3 py-md-0" href="/" onClick={logout}>Logout</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            </Container>
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
        <Route path="/log-in">
          <Login />
        </Route>
        <Route path='/sign-up'>
          <Signup />
        </Route>
        <Route path="/edit-item">
          <EditItem />
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