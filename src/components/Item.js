import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from "react-redux";
import axiosWithAuth from '../common/helpers/axiosWithAuth';
import '../App.css';
import { fetchItems } from '../common/actions/itemActions';

const Item = (props) => {
  const [item, setItem] = useState();
  const { itemID } = useParams()
  // const { items } = props;

  // useEffect(() => { fetchItems(); }, []);

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
  // if(props.isLoading) return <div><br/>Loading Item Details...</div>

  // const selectedItem = items.filter(item => (Number(item.id) === Number(itemID)))


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
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    isLoading: state.isLoading,
  }
}

// export default connect(mapStateToProps, {fetchItems})(Item);
export default Item;