import React from 'react'
import { Container, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'

const Home = () => {

  const { push } = useHistory()

  const routeToShop = () => {
    push('/items-list')
  }
  
  const routeToSignup = () => {
    push('/sign-up')
  }
  return (
    <div className="container-fluid home-wrapper">
        <br/>
        <Container fluid='sm' className='text-center'>
          <Card md="auto" bg='light'>
              <h4>Welcome to Sauti Market, the premier marketplace for new and established small business owners to expand their online presence.
              </h4>  
            </Card><br/>

          <Card md="auto" bg='light'>
              <h4>
              We specialize in helping those who are under-represented with the ability to list and sell items online. This allows business owners to reach a wider audience while still remaining in control of their own business.
              </h4>
          </Card><br/>
          <div>
            <button onClick={routeToSignup} className="btn mx-auto">Sign Up!</button>
            {' '}{' '}{''}
            <button onClick={routeToShop } className="btn mx-auto">Shop Now!</button>
          </div>
          </Container>
    </div>
  )
}

export default Home;