import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Enter from './components/enter';
import Main from './components/main';
import Register from './components/register';
import Write from './components/write';
import Profile from './components/profile';
import Read from './components/read';
import Edit from './components/edit';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Enter />}/>
        <Route path='/main' element={<Main />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/write' element={<Write />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/entries/:id' element={<Read />}/>
        <Route path='/edit/:id' element={<Edit />}/>
      </Routes>
    </BrowserRouter>
  );
};