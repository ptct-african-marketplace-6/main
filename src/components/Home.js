import React from 'react'
import { useHistory } from 'react-router-dom'

const Home = () => {

  const history = useHistory()

  const routeToShop = () => {
    history.push('/items-list')
  }

  return (
    <div className="home-wrapper">
      <a onClick={routeToShop} className="btn">Shop Now!</a>
    </div>
  )
}

export default Home