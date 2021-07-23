import axios from 'axios'
import React, { useState, useEffect } from 'react'
import * as yup from 'yup'

let schema = yup.object().shape({
  item_name: yup.string().required('item name is required'),
  location: yup.string().required('item location is required'),
  quantity: yup.number().required('item amount is required'),
  price: yup.number().test(
    "maxDigitsAfterDecimal",
    "number field must have 2 digits after decimal or less",
    (number) => /^\d+(\.\d{1,2})?$/.test(number)
  ).required('item price is required'),
  description: yup.string().required('item description is required')
})


const ItemForm = () => {
  const [form, setForm] = useState({
    item_name: "",
    location: "",
    quantity: "",
    price: "",
    description: ""
})


  const [errors, setErrors] = useState({
      item_name: "",
      location: "",
      quantity: "",
      price: "",
      description: ""
  })

  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  const [disabled, setDisabled] = useState(true);

  const handleChange = (event) => {
    setForm(event.target.value)
  }

  const submit = (event) => {
    event.prevetDefault()

    const newItem = {
      item_name: form.item_name,
      location: form.location,
      quantity: form.quantity,
      price: form.price,
      description: form.description
    }
    axios.post("https://saudi-market-app.herokuapp.com/api/item", newItem)
    .then((res) => {
      setForm({ item_name: "", location: "", quantity: "", price: "", description: ""})
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    schema.isValid(form).then((valid) => setDisabled(!valid))
  }, [form])

  return (
    <div>
      <form onSubmit={submit}>

        <label for="item_name">Item Name</label>
        <input value={form.item_name} name="item_name" type="text" onChange={handleChange}/>

        <label for="location">Location</label>
        <input value={form.location} name="location" type="text" onChange={handleChange}/>

        <label for="quantity">Quantity</label>
        <input value={form.quantity} name="quantity" type="text" onChange={handleChange}/>

        <label for="price">Price</label>
        <input value={form.price} name="price" type="text" onChange={handleChange}/>

        <label for="description">Description</label>
        <input value={form.description} name="description" type="description" onChange={handleChange}/>

        <button>Submit</button>
      </form>
    </div>
  )
}

export default ItemForm