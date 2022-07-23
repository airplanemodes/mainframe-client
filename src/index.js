import React from 'react';
import ReactDOM from 'react-dom/client';

import { 
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import './index.css';
import App from './App';

import Register from './components/Register';
import AddPost from './components/AddPost';
// import reportWebVitals from './reportWebVitals';

// Rendering root from public/index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/addpost' element={<AddPost />}/>
        <Route path='*' element={
          <p>There's nothing here! 404</p>
        }/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
