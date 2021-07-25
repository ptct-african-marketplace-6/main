import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Container, Nav, Navbar } from 'react-bootstrap';

import ItemsList from './ItemsList';
import AddItem from './AddItem';
import Logout from './Logout';
import Help from './Help';

export default function InnerNavbar(props) {

  const { items } = props;

  return (
    <div className="App">
      <Container fluid='sm' className='text-center' >
        <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
          <Navbar.Brand className="home-nav-btn" href='/items-list' defaultactivekey="/add-item">My Items</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link className="nav-btn" href='/add-item'>Add Item</Nav.Link>
              <Nav.Link className="nav-btn" href="/logout">Log Out</Nav.Link>
              <Nav.Link className="nav-btn" href="/help">Help</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>

      <Switch>
        <Route exact path="/items-list" 
        // component={ItemsList}
        >
          <ItemsList items={items}/>
        </Route>
        <Route exact path="/add-item" 
        // component={AddItem}
        >
          <AddItem items={items}/>
        </Route>
        <Route exact path="/logout" 
        // component={Logout}
        >
          <Logout/>
        </Route>
        <Route exact path="/help">
          <Help/>
        </Route>
      </Switch>
    </div>
  )
};