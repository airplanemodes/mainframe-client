import React, { useState, useEffect } from 'react';
import { userdataUpdate } from '../services/userdata';

import Header from './header';
import Feed from './feed';
import Chat from './chat';
import Footer from './footer';
import './styles/main.css';


export default function Main() {

  let [ user, setUser ] = useState();

  const initializeUser = async() => {
    let userinit = await userdataUpdate();
    if (userinit.username) {
      setUser(userinit);
    } else {
      setUser("guest");
      localStorage.removeItem('localToken');
    }
  }

  useEffect(() => {
    initializeUser();
  }, []);

  return (
    <div>
      <Header user={user || "guest"}/>
        <table id='main-table'>
          <tbody>
            <tr>
              <td><Feed user={user || "guest"}/></td>
              <td>{user !== 'guest' && <Chat user={user}/>}</td>
            </tr>
          </tbody>
        </table>
      <Footer />
    </div>
  );
}