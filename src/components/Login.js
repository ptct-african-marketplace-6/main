// login page will go here

import React from 'react'
import { useHistory } from 'react-router-dom'

const Login = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <form>
        {/* <input />
        <input /> */}
      </form>
    </div>
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
