import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
// import { connect } from "react-redux";
import axiosWithAuth from '../common/helpers/axiosWithAuth';
import '../App.css';
// import { fetchItems } from '../common/actions/itemActions';

const Item = (props) => {
  const [item, setItem] = useState();
  const { itemID } = useParams()
  const { push } = useHistory();

  const routeToShop = () => {
    push('/items-list')
  }
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
  
  console.log(item)
  
  return (
    <div className="container-fluid items-list-container">
        <div className="row d-flex justify-content-center align-items-center mx-auto">
        <div className="item-card col-12 col-md-3 m-2 d-flex flex-column justify-content-center">
          <h2>{item_name}</h2>
          <h4>Price: ${price}</h4>
          <p>Location: {location}</p>
          <p>Quantity: {quantity}</p>
          <p>Description: {description}</p>
          <button className="btn my-3 mx-auto">Add to Cart</button>
          <button onClick={routeToShop} className="btn my-3 mx-auto">Back to Shop!</button>
        </div>
      </div>
    </div>
  )
}

export default Item;