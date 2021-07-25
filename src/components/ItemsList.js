import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Container, Card, Row, Col } from 'react-bootstrap';

const ItemsList = (props) => {
const { items } = props
const { pathname } = useLocation()

  return (
      <Container fluid='sm' className='text-center' >
        <h3>Items For Sale</h3>
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

export default ItemsList