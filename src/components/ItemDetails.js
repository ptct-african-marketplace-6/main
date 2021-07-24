import React from 'react'

const ItemDetails = (props) => {
  const { item } = props

  return (
    <div>
          <p>{item.item_name}</p>
          <p>Price: ${item.price}</p>
          <p>Location: {item.location}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Description: {item.description}</p>
    </div>
  )
}

export default ItemDetails;

// we may not need this component, check if ok to delete