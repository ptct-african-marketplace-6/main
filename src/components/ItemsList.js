import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const ItemsList = (props) => {
const { items } = props
const location = useLocation()

  return (
    <div>
      {items.map(item => (
        <div className="item-card" key={item.id}>
          <Link to={`${location.pathname}/${item.id}`}>
            <img className="img-fluid" src={item.imageURL} alt={item.name}/>
            <p>{item.name}</p>
          </Link>
          <p>${item.price}</p>
        </div>
      ))}
    </div>
  )
}

export default ItemsList