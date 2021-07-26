import React from 'react'
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
        <a onClick={routeToShop} className="btn mx-auto">Shop Now!</a>
        </div>
      </div>
    </div>
  )
}

export default Home