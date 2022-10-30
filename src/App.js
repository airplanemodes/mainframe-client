import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Enter from './components/enter';
import Main from './components/main';
import Register from './components/register';

export default function App() {
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