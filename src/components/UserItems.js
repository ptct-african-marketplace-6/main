import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { Container, Card, Row } from 'react-bootstrap';
import { fetchItems, deleteItem } from '../common/actions/itemActions';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../common/helpers/axiosWithAuth';
import { Link } from '@material-ui/core';
import EditItem from './EditItem';

const UserItems = (props) => {
const { items } = props;
const { push } = useHistory();

const [editMode, setEditMode] = useState(false);

// const routeToEdit = (item) => {
//   push('/edit-item')
// }

const toggleEdit = () => {
  setEditMode(!editMode);
  console.log(editMode);
}
const userName = localStorage.getItem('username');
const userID = localStorage.getItem("userID");

useEffect(() => { fetchItems(); }, []);

const filteredUserItems = items.filter(item => (Number(item.user_id) === Number(userID)));

if (props.isLoading) {
    return <><h2>Loading {userName}'s items...</h2></>
};

const handleDelete = (item) => {
  const itemID = Number(item.id)
  axiosWithAuth().delete(`items/${itemID}`)
    .then(res => {
      console.log("item has been deleted:", res.data);
      fetchItems();
    push('/user-items')
    })
    .catch(err => {
      console.log({err});
    })
}

  return (
    <div className="text-center form-wrapper">
      <Container fluid='sm' className='text-center'>
        <h3>Hi {userName}! View your listed items below!</h3>
          <Row xs lg='2'>

          { 

            userID && 

            filteredUserItems.map((item) => (
              <div className='text-center' key={item.id}>
                  <Card md="auto" variant="light" bg='light' key={item.id}>
                  <div className="item-card" key={item.id}>
                      <Card.Header>
                        <img className="img-fluid" src={item.image_url} alt={item.name}/>
                        <button className="user-item-btn" action="none">
                          <h5>{item.item_name}</h5>
                          </button>
                        </Card.Header>
                        <h6>Item ID: {item.id}</h6>
                    <h6>Price: ${item.price}</h6>
                    <h6>Location: {item.location}</h6>
                    <h6>Quantity: {item.quantity}
                    </h6>
                    <h6>Description: {item.description}</h6>
                    <button className="edit-btn my-3 mx-auto" 
                    onClick={toggleEdit}>Edit</button>
                    <button className="delete-btn my-3 mx-auto" onClick={() => handleDelete(item)}>Delete</button>
                    {console.log(item)}
                  </div>
                  </Card><br/>
              </div>
            ))
            }

            {
              editMode && 
              <Card md="auto" variant="light" bg='light'>
                <div className="item-card">
                  <EditItem />
                </div>
              </Card>
            }

          </Row>
      </Container>
      </div>
  )
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    isLoading: state.isLoading,
  }
}

export default connect(mapStateToProps, {fetchItems, deleteItem})(UserItems);
