import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup'
import '../App.css';
import axiosWithAuth from '../common/helpers/axiosWithAuth';

let schema = yup.object().shape({
  item_name: yup.string().required('item name is required'),
  location: yup.string().required('item location is required'),
  quantity: yup.number().required('item amount is required'),
  price: yup.number().test(
    "maxDigitsAfterDecimal",
    "number field must have 2 digits after decimal or less",
    (number) => /^\d+(\.\d{1,2})?$/.test(number)
  ).required('item price is required'),
  description: yup.string().required('item description is required'),
  image_url: yup.string().required('item image URL is required') 
})


const EditItem = (props) => {
  const { id } = useParams();
  // const { itemID } = props;
  const { push } = useHistory();
  const userID = localStorage.getItem("userID");

  const initialValues = {
    item_name: "",
    location: "",
    quantity: "",
    price: "",
    description: "",
    image_url: "",
    user_id: userID  
  }

  console.log(id)

  useEffect(() => {
    axiosWithAuth()
    .get(`items/${id}`)
    .then(res => {
      setForm(res.data)
    })
    .catch(err => {
      console.log({err})
    })
  }, [])


  const [form, setForm] = useState({
    item_name: "",
    location: "",
    quantity: "",
    price: "",
    description: "",
    image_url: "",
    user_id: userID
  })

  const [errors, setErrors] = useState({
      item_name: "",
      location: "",
      quantity: "",
      price: "",
      description: "",
      image_url: ""
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
      [e.target.name]: e.target.value,
    })
    setFormErrors(e.target.name, e.target.value)
  }

  const submit = (e) => {
    e.preventDefault()
    axiosWithAuth.post(`items/${e.id}`, form)
    .then(res => {
      console.log("body of edited item: ", form)
      console.log("Successfully edited item!");
      console.log(res.data)
      setForm(initialValues)
      push('/user-items');
    })
    .catch((err) => {
      console.log({err})
    })
  }

  useEffect(() => {
    schema.isValid(form).then((valid) => setDisabled(!valid))
  }, [form])

  return (
    <div className="text-center form-wrapper">
      <main className="form-signin text-center">
        <form className="text-center" onSubmit={submit}>
        <h1 className='h3 mb-3 fw-normal'>
            Edit your item using the form below!
          </h1>
          <br/>
          <h4>Item Name</h4>
          <div className="form-floating">
            <input  
              placeholder={form.item_name}
              value={form.item_name} 
              name="item_name" 
              type="text" 
              className="form-control"
              id="floatingInput"
              onChange={handleChange}
            />
          </div>
          <br/>
          <h4>Location</h4>
          <div className="form-floating">
            <input 
              placeholder="Location"
              value={form.location} 
              name="location" 
              type="text" 
              className="form-control"
              id="floatingInput"
              onChange={handleChange}
            />
          </div>          
          <br/>
          <h4>Quantity</h4>
          <div className="form-floating">
            <input 
              placeholder="Quantity"
              value={form.quantity} 
              name="quantity" 
              type="text" 
              className="form-control"
              id="floatingInput"
              onChange={handleChange}
            />
          </div>
          <br/>
          <h4>Price</h4>
          <div className="form-floating">
            <input 
              placeholder="Price"
              value={form.price} 
              name="price" 
              type="text" 
              className="form-control"
              id="floatingInput"
              onChange={handleChange}
            />
          </div>
          <br/>
          <h4>Description</h4>
          <div className="form-floating">
            <input 
              placeholder="Description"
              value={form.description} 
              name="description" 
              type="text" 
              className="form-control"
              id="floatingInput"
              onChange={handleChange}
              />
          </div>
          <br/>
          <h4>Product Image URL</h4>
          <div className="form-floating">
            <input 
              placeholder="Product Image URL"
              value={form.image_url} 
              name="image_url" 
              type="text" 
              className="form-control"
              id="floatingInput"
              onChange={handleChange}
              />
          </div>
          <br/>
          <button className="w-100 btn btn-lg btn-success" disabled={disabled}>Submit Changes</button>
        </form>
      </main>
    </div>
  )
}

export default EditItem;