import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { Container, Card, Row } from 'react-bootstrap';
import { fetchItems, deleteItem } from '../common/actions/itemActions';
// import { useHistory } from 'react-router-dom';
// import axiosWithAuth from '../common/helpers/axiosWithAuth';

const UserItems = (props) => {
const { items } = props;
// const { push } = useHistory();

const userName = localStorage.getItem('username');
const userID = localStorage.getItem("userID");

const filteredUserItems = items.filter(item => (Number(item.user_id) === Number(userID)));

// const [userItems, setUserItems] = useState(filteredUserItems);

useEffect(() => { fetchItems(); }, []);

if (props.isLoading) {
    return <><h2>Loading {userName}'s items...</h2></>
};


// setUserItems(filteredUserItems);

// const handleDelete = (item) => {
//   axiosWithAuth().delete(`items/${item.id}`)
//     .then(res => {
//       console.log("item has been deleted:", res.data);
//       setUserItems(res.data)
//     push('/user-items')
//     })
//     .catch(err => {
//       console.log({err});
//     })
// }

// console.log(allItems);
// console.log(filteredUserItems[0].id);
// console.log(userID);
// console.log(allItems[11].user_id)
// console.log(isOwner);
// console.log(items);

  return (
    <div className="text-center form-wrapper">
      <Container fluid='sm' className='text-center'>
        <h3>Hi {userID}! View your listed items below!</h3>
          <Row xs lg='2'>
            {filteredUserItems.map((item) => (
              <div className='text-center' key={item.id}>
                  <Card md="auto" variant="light" bg='light'>
                  <div className="item-card">
                      <Card.Header>
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
                    <button className="edit-btn my-3 mx-auto">Edit</button>
                    <button className="delete-btn my-3 mx-auto" key={item.id} onClick={() => props.deleteItem(item)}>
                    {/* <button className="delete-btn my-3 mx-auto" key={item.id} onClick={handleDelete}>                      */}
                      Delete</button>
                    {/* {console.log(item)} */}
                  </div>
                  </Card><br/>
              </div>
            ))}
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

export default connect(mapStateToProps, {fetchItems, deleteItem})(UserItems)
