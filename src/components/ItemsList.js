import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const ItemsList = (props) => {
const { items } = props
const location = useLocation()

  return (
    <div className="container-fluid items-list-container">
      <div className="row d-flex justify-content-center align-items-center mx-auto">
        {items.map(item => (
          <div className="item-card col-12 col-md-3 m-2 d-flex flex-column justify-content-center" key={item.id}>
            <Link to={`${location.pathname}/${item.id}`}>
              <img className="img-fluid" src={item.imageURL} alt={item.name}/>
              <p>{item.item_name}</p>
            </Link>
            <p>${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItemsList