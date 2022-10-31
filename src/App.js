import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Enter from './components/enter';
import Main from './components/main';
import Register from './components/register';
import { useEffect, useState } from 'react';
import { userdataUpdate } from './services/userdata';

export default function App() {

  let [ user, setUser ] = useState(null);

  useEffect(() => {
      initializeUser();
  },[]);

  const initializeUser = async() => {
      let userdata = await userdataUpdate();
      setUser(userdata);
      console.log(userdata);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Enter />}/>
        <Route path='/main' element={<Main />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
    </BrowserRouter>
  );
};