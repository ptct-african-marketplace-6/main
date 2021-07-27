import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import * as yup from 'yup'
import '../App.css';
// import axiosWithAuth from '../common/helpers/axiosWithAuth';

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
  const userID = localStorage.getItem("userID");

  const initialValues = {
    item_name: "",
    location: "",
    quantity: "",
    price: "",
    description: "",
    user_id: userID  
  }

  const [form, setForm] = useState({
    item_name: "",
    location: "",
    quantity: "",
    price: "",
    description: "",
    user_id: userID
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
    // const { name, type } = e.target
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      // user_id: userID
    })
    // console.log(form)
    setFormErrors(e.target.name, e.target.value)
    // console.log(errors)
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
      console.log({err})
    })
  }

  useEffect(() => {
    schema.isValid(form).then((valid) => setDisabled(!valid))
  }, [form])

  return (
    <div className="text-center">
      <main className="form-signin text-center">
        <form className="text-center" onSubmit={submit}>
        <h1 className='h3 mb-3 fw-normal'>
            Add your new item.
          </h1>
        <h1 className='h5 mb-3 fw-normal'>
          This will be added to the marketplace as your new listing.
        </h1>
          <br/>
          <div className="form-floating">
            <input 
              value={form.item_name} 
              name="item_name" 
              type="text" 
              className="form-control"
              id="floatingInput"
              onChange={handleChange}
            />
          <label htmlFor="floatingInput">Item Name</label>
          </div>
          <br/>

          <div className="form-floating">
            <input 
              value={form.location} 
              name="location" 
              type="text" 
              className="form-control"
              id="floatingInput"
              onChange={handleChange}
            />
          <label htmlFor="floatingInput">Location</label>
          </div>          
          <br/>

          <div className="form-floating">
            <input 
              value={form.quantity} 
              name="quantity" 
              type="text" 
              className="form-control"
              id="floatingInput"
              onChange={handleChange}
            />
          <label htmlFor="floatingInput">Quantity</label>
          </div>
          <br/>

          <div className="form-floating">
            <input 
              value={form.price} 
              name="price" 
              type="text" 
              className="form-control"
              id="floatingInput"
              onChange={handleChange}
            />
          <label htmlFor="floatingInput">Price</label>
          </div>
          <br/>

          <div className="form-floating">
            <input 
              value={form.description} 
              name="description" 
              type="text" 
              className="form-control"
              id="floatingInput"
              onChange={handleChange}
              />
          <label htmlFor="floatingInput">Description</label>
          </div>
          <br/>
          <button className="w-100 btn btn-lg btn-success" disabled={disabled}>Submit</button>
        </form>
      </main>
    </div>
  )
}

export default AddItem;