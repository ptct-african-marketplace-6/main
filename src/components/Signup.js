import axios from 'axios';
import React,{ useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css'

const initialState = {
  username: '',
  password: '',
  email: '',
  isOwner: false
}

const initialErrorState = {
  error_msg: '',
  error_visible: false
}

const SignUp = () => {

  const [newUser, setNewUser] = useState(initialState);
  const [errorData, setErrorData] = useState(initialErrorState);
  const history = useHistory();

  const changeHandler = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    // console.log("form submitted: ", newUser);
    let usernameLength = newUser.username.length;
    let passwordLength = newUser.password.length;
    let emailNumberLength = newUser.email.length;

    if (usernameLength < 4) {
      setErrorData({
        ...errorData,
        error_visible:true,
        error_msg:"username must be at least 4 charachers"
      })
    }
    else if (passwordLength < 6) {
      setErrorData({
        ...errorData,
        error_visible:true,
        error_msg:"password must be at least 6 characters"
      })
    }
    else if (emailNumberLength < 11) {
      setErrorData({
        ...errorData,
        error_visible:true,
        error_msg: "invalid email address"
      });
    }
    else {
      setErrorData({
        ...errorData,
        error_visible:false,
        error_msg: ''
      });
      axios.post("https://saudi-market-bw.herokuapp.com/api/auth/register", newUser)
      .then((res) => {
        // console.log(res.data);
        localStorage.setItem('username', newUser.username);
        setNewUser({
          username: newUser.username
        })
        history.push('/Login');
      })
      .catch((err) => {
        console.log(err);
      })
    }    
  }

  return (
    <div></div>
  )
}

export default SignUp