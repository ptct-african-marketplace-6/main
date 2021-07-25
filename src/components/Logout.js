import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';

function Logout(props) {
    const { push } = useHistory();
    localStorage.removeItem('token') 
    localStorage.removeItem('username')
    push('/');

    return <Redirect to='/' />
};

export default Logout;