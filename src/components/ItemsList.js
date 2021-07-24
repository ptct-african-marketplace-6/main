import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const ItemsList = (props) => {
const { items } = props
const { pathname } = useLocation()

  return (
    <div>
      {items.map(item => (
        <div className="item-card" key={item.id}>
          <Link to={`${pathname}/${item.id}`}>

            {/* <img className="img-fluid" src={item.imageURL} alt={item.name}/> */}
            <p>{item.item_name}</p>
          </Link>
          <p>Price: ${item.price}</p>
          <p>Location: {item.location}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Description: {item.description}</p>
        </div>
      ))}
    </div>
  )
}

export default ItemsList