import React from 'react'
import { Container, Card } from 'react-bootstrap';

const Home = () => {

  return (
    <div className="home-wrapper">
      <div className='App'><br/>
      <Container>
        <Card bg="light" >
          <Card.Header><h3>Welcome to Sauti Market!</h3></Card.Header>
          <div>
            <Card.Body>
              This is the premier marketplace for new and established small business owners to expand their presence online.
            </Card.Body>
            <Card.Body>
              We specialize in helping small business owners, especially those who are underrepresented, with the ability to list and sell items online. This allows business owners to reach a wider audience while still remaining in control of their own business.
            </Card.Body>
          </div>
          </Card>
        </Container>
        </div>
    </div>
  )
}

export default Home