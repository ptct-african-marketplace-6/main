import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import axiosWithAuth from '../common/helpers/axiosWithAuth';

function SignUp(props) {

  const { push } = useHistory();

  const [disabledButton, setDisabledButton] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    owner: false,
  })

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    owner: '',
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
    owner: yup.boolean(),
  })

  const setFormErrors = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: '' }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(JSON.stringify(formData))
    axiosWithAuth().post('auth/register', formData)
      .then(res => {
        console.log(res)
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
    setFormData((prev) => {
      return {
        ...formData,
        [e.target.name]: e.target[valueToUse],
      }
    })
    // console.log(formData)

    setFormErrors(e.target.name, e.target[!valueToUse])
  }

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => setDisabledButton(!valid))
  })

  return (
    <>
      <div className='container-fluid col-md-auto'>
        <div className='App'>
          <form
            onSubmit={handleSubmit}
            className='d-flex flex-column container-fluid col-md-auto'
          >
            <div className='row'>
              <label>
                Username&nbsp;
                <input
                  name='username'
                  type='text'
                  value={formData.username}
                  onChange={handleChange}
                />
              </label>
            </div><br/>

            <div className='row'>
              <label>
                Email&nbsp;
                <input
                  name='email'
                  type='text'
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
            </div><br/>

            <div className='row'>
              <label>
                Password&nbsp;
                <input
                  name='password'
                  type='password'
                  value={formData.password}
                  onChange={handleChange}
                />
              </label>
            </div><br/>

            <div className='row'>
              <label>
                Owner?&nbsp;
                <input
                  name='owner'
                  type='checkbox'
                  checked={formData.owner}
                  onChange={handleChange}
                />
              </label>
            </div><br/>

            <div className='row'>
              <button disabled={disabledButton}>Submit!</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp

/* https://drive.google.com/drive/folders/11iiMC9DiRtoqz77CTCeJPpR8zmiALyw0
User Object:
{
  id: integer
  username: string
  password: string 
  email: string
  isOwner: boolean
}
Item Object:
{
  id: integer
  item_name: string
  location: string
  quantity: integer
  price: float
  description: string
  user_id: integer // this references the id in the user table
} 
These are your ENDPOINTS and we list what each will return:
Users
POST https://sauti-market-app.herokuapp.com/api/auth/login
POST https://sauti-market-app.herokuapp.com/api/auth/register
 */