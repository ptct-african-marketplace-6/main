import React from 'react'
import { useHistory } from 'react-router-dom'

const Home = () => {

  const history = useHistory()

  const routeToShop = () => {
    history.push('/items-list')
  }

  return (
    <div className="home-wrapper">
      <div className='App'>
      {/* <a onClick={routeToShop} className="btn"> */}
        <h3>Welcome to Sauti Market!</h3>
        <div>
          <span>
            <p>This is the premier marketplace for new and established small business owners to expand their presence online.</p>
          </span>
          <span>
            <p>We specialize in helping small business owners, especially those who are underrepresented, with the ability to list and sell items online. This allows business owners to reach a wider audience while still remaining in control of their own business.</p>
          </span>
        </div>
        {/* </a> */}
        </div>
    </div>
  )
}

export default Home