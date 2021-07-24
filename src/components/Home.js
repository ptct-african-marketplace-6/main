import React from 'react'
import { useHistory } from 'react-router-dom'

const Home = () => {

  const history = useHistory()

  const routeToShop = () => {
    history.push('/items-list')
  }

  return (
    <div className="home-wrapper">
      <a onClick={routeToShop} className="btn"><h3>Shop Now!</h3></a>
    </div>
  )
}

export default Home