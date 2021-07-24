import React, { useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import * as yup from 'yup'
import axiosWithAuth from "../common/helpers/axiosWithAuth";

function Login(props) {
  const { push } = useHistory();

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
    username: yup.string().required('Pleae include your username.'),
    password: yup.string().required('Password is Required'),
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
    // alert(
    //   `we should submit an axios request now using ${JSON.stringify(
    //     formData
    //   )} but the endpoint is not working`
    // )
    axiosWithAuth().post("auth/login", formData)
    .then((res) => {
      localStorage.setItem("token", formData.password);
      setFormData({
        username: formData.username
      });
      console.log("submitted login successfully:", res);
      push("/items-list");
    })
    .catch((err) => {
      console.error("something went wrong with post request: ", {err});
    })
  }

  const handleChange = (e) => {
    // const { name, type } = e.target
    // const valueToUse = type === 'value'
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    })
    console.log(formData)
    // setFormErrors(name, type)
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
            </div>
            <br/>
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
            </div>
            <div className='row'><br/>
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