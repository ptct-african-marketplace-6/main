import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import axiosWithAuth from '../../common/helpers/axiosWithAuth';

import './signup.css';

function SignUp(props) {

  const { push } = useHistory();

  const [disabledButton, setDisabledButton] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isOwner: false,
  })

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    isOwner: '',
  })

  const formSchema = yup.object().shape({
    username: yup
      .string()
      .required('Please include your name.')
      .min(6, 'Name must be at least 6 characters long'),
    email: yup
      .string()
      .email('Please include your email address.')
      .required('Must include email address.'),
    password: yup
      .string()
      .required('Password is Required')
      .min(6, 'Passwords must be at least 6 characters long.'),
    isOwner: yup.boolean(),
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
    // alert(JSON.stringify(formData))

    axiosWithAuth().post('auth/register', formData)
      .then(res => {
        console.log(res.data)
        localStorage.setItem('token', formData.password);
        // setFormData({
        //   username: formData.username
        // })
        push('/')
      })
      .catch(err => {
        console.log({err})
      })
  }

  const handleChange = (e) => {
    const { type } = e.target
    const valueToUse = type === 'checkbox' ? 'checked' : 'value'
    setFormData({
        ...formData,
        [e.target.name]: e.target[valueToUse],
    })
    console.log(formData)

    setFormErrors(e.target.name, e.target[valueToUse])
  }

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => setDisabledButton(!valid))
  })

  return (
    <div className='text-center'>
      <main className='form-signin text-center'>
        <form className='text-center' onSubmit={handleSubmit}>
          <h1 className='h3 mb-3 fw-normal'>
            Welcome! Please sign up using the form below.
          </h1>
          <div className='form-floating'>
          <label htmlFor='floatingInput'>Name</label>{' '}
            <input
              name='username'
              className='form-control'
              id='floatingInput'
              placeholder='John Smith'
              type='text'
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className='form-floating'>
          <label htmlFor='floatingEmail'>Email</label>{' '}
            <input
              name='email'
              id='floatingEmail'
              type='text'
              placeholder='john.smith@gmail.com'
              className='form-control'
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className='form-floating'>
          <label htmlFor='floatingPassword'>Password</label>{' '}
            <input
              name='password'
              type='password'
              className='form-control'
              placeholder='******'
              value={formData.password}
              id='floatingPassword'
              onChange={handleChange}
            />
          </div>

          <div className='checkbox mb-3 row'>
          <label htmlFor='floatingOwner'>Owner?</label>{' '}
            <input
              name='owner'
              id='floatingOwner'
              type='checkbox'
              checked={formData.isOwner}
              onChange={handleChange}
            />
          </div>

          <button
            className='w-100 btn btn-lg btn-primary'
            disabled={disabledButton}
          >
            Submit!
          </button>
        </form>
      </main>
    </div>
  )
}

export default SignUp;
