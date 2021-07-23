// login page will go here

import React from "react";
import { useHistory } from "react-router-dom";

const Login = () => {

  return (
    <div>
      <h1>Login Page</h1>
      <form >
        <label>Username&nbsp;
          <input 
            type="text"
            name="username"
            id="username"
            // className="signUpInput"
            placeholder="Example: help_me"
            // value={newUser.username}
            // onChange={changeHandler}
          />
        </label>{' '}
        <label>Password&nbsp;
          <input 
            type="password"
            id="password"
            name="password"
            placeholder="your password"
            // onChange={changeHandler}
            // value={loginData.password}        
          />
        </label>{' '}
        <button>Login!</button>
      </form>
    </div>
  );
};

export default Login;

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