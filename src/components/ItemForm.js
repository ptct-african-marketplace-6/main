import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import * as yup from 'yup'

import '../App.css';

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


const AddItem = () => {
  const { push } = useHistory();

  const initialValues = {
    item_name: "",
    location: "",
    quantity: "",
    price: "",
    description: ""    
  }

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
    setFormErrors(e.target.name, e.target.value)
  }

  const submit = (e) => {
    e.preventDefault()

    axios.post("https://sauti-market-bw.herokuapp.com/api/items", form)
    .then(res => {
      console.log("body of new item: ", form)
      console.log("Successfully added new item!");
      console.log(res.data)
      setForm(initialValues)
      push('/items-list');
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    schema.isValid(form).then((valid) => setDisabled(!valid))
  }, [form])

  return (
    <div className="container-fluid form-wrapper">
      <div className="row mx-auto">
        <div className="col-12 d-flex justify-content-center">
          <form onSubmit={submit} className="d-flex flex-column justify-content-center p-3 m-3">

            <label className="py-2" htmlFor="item_name">Item Name</label>
            <input value={form.item_name} name="item_name" type="text" onChange={handleChange}/>

            <label className="py-2" htmlFor="location">Location</label>
            <input value={form.location} name="location" type="text" onChange={handleChange}/>

            <label className="py-2" htmlFor="quantity">Quantity</label>
            <input value={form.quantity} name="quantity" type="text" onChange={handleChange}/>

            <label className="py-2" htmlFor="price">Price</label>
            <input value={form.price} name="price" type="text" onChange={handleChange}/>

            <label className="py-2" htmlFor="description">Description</label>
            <input value={form.description} name="description" type="description" onChange={handleChange}/>

            <button className="btn my-3 mx-auto" disabled={disabled}>Submit</button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default AddItem;