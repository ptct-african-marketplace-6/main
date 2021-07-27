import React from 'react'
// import { Container, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'

const Home = () => {

  const history = useHistory()

  const routeToShop = () => {
    history.push('/items-list')
  }
  
  return (
    <div className="container-fluid home-wrapper">
      <div className="row py-5">
        <div className="col-12 d-flex justify-content-center align-items-center py-5 my-5">
        <a onClick={routeToShop } className="btn mx-auto">Shop Now!</a>
        </div>
        {/* <div> */}
          {/* <p>This is the premier marketplace for new and established small business owners to expand their presence online.</p>

          <p>We specialize in helping small business owners, especially those who are underrepresented, with the ability to list and sell items online. This allows business owners to reach a wider audience while still remaining in control of their own business.</p>
        </div> */}
      </div>
    </div>
  )
}

export default Home;