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
        </label>
        <label>Password&nbsp;
          <input 
            type="password"
            id="password"
            name="password"
            placeholder="your password"
            // onChange={changeHandler}
            // value={loginData.password}        
          />
        </label>
      </form>
    </div>
  );
};

export default Login;