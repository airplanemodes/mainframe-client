import React from 'react';
import { userdataUpdate } from '../services/userdata';

import './styles/header.css';

export default function Header(props) {

  // console.log(props);

  const userLogout = async() => {
    localStorage.removeItem('localToken');
    await userdataUpdate();
    window.location = '/';
  };

  return (
    <header>
      <h1>10011010 Welcome to Mainframe 00110101</h1>
      { !localStorage.localToken ?
      <React.Fragment>
        <div className='userbar'>
          <h4>logged as guest</h4>
          <a href='/'><button id='loginButton'>Login</button></a>
        </div>
      </React.Fragment>
      :
      <React.Fragment>
        <div className='userbar'>
          <h4>logged as {props.user.username}</h4>
          <a href='/write'><button id='writeButton'>Write</button></a>
          <a href='/profile'><button id='profileButton'>Profile</button></a>
          <button id='logoutButton' onClick={userLogout}>Logout</button>
        </div>
      </React.Fragment>
      }
    </header>
  );
};