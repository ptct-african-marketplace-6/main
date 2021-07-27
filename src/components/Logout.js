import React from 'react';
import { Redirect } from 'react-router-dom';

function Logout(props) {

    localStorage.removeItem('token'); 
    localStorage.removeItem('username');
    localStorage.removeItem('userID');
    localStorage.setItem("userID");
    localStorage.setItem("isOwner");

    return <Redirect to='/' />
};

export default Logout;