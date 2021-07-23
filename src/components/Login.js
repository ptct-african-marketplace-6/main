import React from 'react'
import { useState, useEffect } from 'react'
import * as yup from 'yup'

function Login(props) {
  const [disabledButton, setDisabledButton] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pass: '',
    owner: false,
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    pass: '',
    owner: '',
  })

  const formSchema = yup.object().shape({
    name: yup.string().required('Pleae include your name.'),
    email: yup.string().required('Must include email address.'),
    pass: yup.string().required('Password is Required'),
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
    alert(
      `we should submit an axios request now using ${JSON.stringify(
        formData
      )} but the endpoint is not working`
    )
  }

  const handleChange = (e) => {
    const { name, type } = e.target
    const valueToUse = type === 'checkbox' ? 'checked' : 'value'
    setFormData((prev) => {
      return {
        ...formData,
        [e.target.name]: e.target[valueToUse],
      }
    })

    setFormErrors(name, e.target[valueToUse])
  }

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => setDisabledButton(!valid))
  })

  return (
    <>
      <div class='container-fluid col-md-auto'>
        <div className='App'>
          <form
            onSubmit={handleSubmit}
            className='d-flex flex-column container-fluid col-md-auto'
          >
            <div className='row'>
              <label>
                Name
                <input
                  name='name'
                  type='text'
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className='row'>
              <label>
                Email
                <input
                  name='email'
                  type='text'
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className='row'>
              <label>
                Password
                <input
                  name='pass'
                  type='text'
                  value={formData.pass}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className='row'>
              <label>
                Owner?
                <input
                  name='owner'
                  type='checkbox'
                  checked={formData.owner}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className='row'>
              <button disabled={disabledButton}>Submit!</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login

//https://drive.google.com/drive/folders/11iiMC9DiRtoqz77CTCeJPpR8zmiALyw0

/* User Object:
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
} */

/* These are your ENDPOINTS and we list what each will return:
Users
[POST] https://team-amazing.herokuapp.com/api/auth/register
    returns user object
[POST] https://team-amazing.herokuapp.com/api/auth/login
    returns token, user object
Items
*/
