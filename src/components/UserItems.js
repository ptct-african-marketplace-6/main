import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Container, Card, Row } from 'react-bootstrap';
import axiosWithAuth from '../common/helpers/axiosWithAuth';

const UserItems = (props) => {
const { items } = props
const { pathname } = useLocation()

// const initialValues = {
//   userItems: []
// }

// const [allItems, setAllItems] = useState('');
// const [userList, setUserList] = useState(initialValues);
const userToken = localStorage.getItem('token');
const userName = localStorage.getItem('username');

useEffect(() => {
  axiosWithAuth()
  // .fetchItems() <--- this action needs more work
    .get('items')
    .then(res => {
      console.log(res.data);
      // setAllItems(res.data)
    })
    .catch(err => {
      console.log(err);
    })
}, []);
if (props.isLoading) {
    return <><h2>Loading {userName}'s items...</h2></>
};

// need to figure out how to access logged in user's user_id as it does currently return in the login user object from the login call. 
const filteredItems = items.filter(item => item.user_id === {userToken})

console.log(filteredItems);
console.log(userToken)
console.log(items)

  return (
      <Container fluid='sm' className='text-center' >
        <h3>Hi {userName}! View items below!</h3>
          <Row xs lg='2'>
            {items.map(item => (
              <div className='text-center'>
                  <Card md="auto" variant="light" bg='light'>
                  <div className="item-card" key={item.id}>
                    <Link to={`${pathname}/${item.id}`}>

                      {/* <img className="img-fluid" src={item.imageURL} alt={item.name}/> */}
                      <Card.Header>
                        <button className='w-100 btn btn-lg btn-warning'><h5>{item.item_name}</h5></button>
                        </Card.Header>
                    </Link>
                    <h5>Price:</h5> <p>${item.price}</p>
                    <h5>Location:</h5> <p>{item.location}</p>
                    <h5>Quantity:</h5> <p>{item.quantity}</p>
                    <h5>Description:</h5> <p>{item.description}</p>
                  </div>
                  </Card><br/>
              </div>
            ))}
          </Row>
      </Container>
  )
}

export default UserItems