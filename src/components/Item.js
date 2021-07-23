import React from 'react'
import { useParams, useRouteMatch, } from 'react-router-dom'

const Item = (props) => {
  const { items } = props
  const { itemID } = useParams()

  const item = items.find(item => item.id === itemID)

  if(!item) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>{item.item_name}</h2>
      <h4>${item.price}</h4>
      <p>{item.location}</p>
      <p>{item.quantity}</p>
      <p>{item.description}</p>
      <p>{item.user_id}</p>
    </div>
  )
}

export default Item 