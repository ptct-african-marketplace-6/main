import React, { useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import * as yup from 'yup'
import axiosWithAuth from "../../common/helpers/axiosWithAuth";

import './login.css';

function Login(props) {
  const history = useHistory();

  const [disabledButton, setDisabledButton] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  })

  const formSchema = yup.object().shape({
    username: yup.string().required('Please include your username.'),
    password: yup.string().required('Password is Required'),
  })

  const setFormErrors = (username, value) => {
    yup
      .reach(formSchema, username)
      .validate(value)
      .then(() => setErrors({ ...errors, [username]: '' }))
      .catch((err) => setErrors({ ...errors, [username]: err.errors[0] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axiosWithAuth().post("auth/login", formData)
    .then((res) => {
      console.log(res.data)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userID", res.data.id);
      localStorage.setItem("isOwner", res.data.isOwner);
      localStorage.setItem("username", res.data.username);
      setFormData({
        username: formData.username,
        // user_id: res.data.id
      });
      console.log("submitted login successfully:", res);
      history.push("/items-list");
    })
    .catch((err) => {
      console.error("something went wrong with post request: ", {err});
    })
  }

  const handleChange = (e) => {
    const { username } = e.target
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    })
    // console.log(formData)
    setFormErrors(username, e.target.value)
  }

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => setDisabledButton(!valid))
  })

  return (
    <>
      <div className='container-fluid container-fluid form-wrapper'>
        <div className='form-signin'>
          <br/>
          <form 
            className='text-center'
            onSubmit={handleSubmit}
          >
          <h1 className='h3 mb-3 fw-normal'>
            Welcome! Please log in using the form below.
          </h1>
          <div className='form-floating'>
            <input
              name='username'
              className='form-control'
              id='floatingInput'
              type='text'
              value={formData.username}
              onChange={handleChange}
            />
            <label htmlFor='floatingInput'>Name</label>
          </div>

          <div className='form-floating'>
            <input
              name='password'
              type='password'
              className='form-control'
              value={formData.password}
              id='floatingPassword'
              onChange={handleChange}
            />
          <label htmlFor='floatingPassword'>Password</label>
          </div>
            <br/>
            <div className='row'><br/>
              <button className="w-100 btn btn-lg btn-success" disabled={disabledButton}>Submit!</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login

// Alternate submit button styling
{/* <button className="btn my-3 mx-auto" disabled={disabledButton}>Suubmit!</button> */}