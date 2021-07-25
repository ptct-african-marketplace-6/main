import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import axiosWithAuth from '../../common/helpers/axiosWithAuth'

import './signup.css'

function SignUp(props) {
  // Will be true if bootstrap is loaded, false otherwise

  const { push } = useHistory()

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
    isOwner: yup.bool(),
  })

  const setFormErrors = (variable, value) => {
    yup
      .reach(formSchema, variable)
      .validate(value)
      .then(() => setErrors({ ...errors, [variable]: '' }))
      .catch((err) => setErrors({ ...errors, [variable]: err.errors[0] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axiosWithAuth()
      .post('auth/register', formData)
      .then((res) => {
        console.log(res.data)
        localStorage.setItem('token', formData.password)
        // setFormData({
        //   username: formData.username
        // })
        push('/')
      })
      .catch((err) => {
        console.log({ err })
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
      <main className='form-signup text-center'>
        <form className='text-center' onSubmit={handleSubmit}>
          <h1 className='h3 mb-3 fw-normal'>
            Welcome! Please sign up using the form below.
          </h1>
          <div className='form-floating'>
            <label for='floatingInput'>Name</label>
            <input
              name='username'
              className='form-control'
              id='floatingUser'
              placeholder='John Smith'
              type='text'
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className='form-floating'>
            <label for='floatingEmail'>Email</label>
            <input
              name='email'
              className='form-control'
              id='floatingEmail'
              placeholder='john.smith@gmail.com'
              type='text'
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className='form-floating'>
            <label for='floatingPassword'>Password</label>
            <input
              name='password'
              className='form-control'
              id='floatingPassword'
              placeholder='******'
              type='password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className='checkbox mb-3 row'>
            <label for='floatingisOwner'>Owner?</label>
            <input
              name='isOwner'
              id='floatingisOwner'
              type='checkbox'
              checked={formData.isOwner}
              onChange={handleChange}
            />
          </div>

          <button
            id='submitBtn'
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

export default SignUp
