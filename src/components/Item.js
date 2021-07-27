import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosWithAuth from '../common/helpers/axiosWithAuth';

const Item = (props) => {
  const [item, setItem] = useState();
  const { itemID } = useParams()

  useEffect(() => {
    axiosWithAuth()
      .get(`items/${itemID}`)
      .then(res => {
        console.log(res.data)
        setItem(res.data)
      })
      .catch(err => {
        console.log({err})
      });
  }, [itemID])

  if(!item) return <div><br/>Loading Item Details...</div>

  const { item_name, price, location, quantity, description } = item;

  return (
    <div>
      <h2>{item_name}</h2>
      <h4>Price: ${price}</h4>
      <p>Location: {location}</p>
      <p>Quantity: {quantity}</p>
      <p>Description: {description}</p>
      <button className="add-cart-btn">Add to Cart</button>
    </div>
  )
}

export default Item 