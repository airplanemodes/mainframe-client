import './App.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function App() {

  const [count, setCount] = useState(0);

  return (
    <div className="App">
        <p className='welcome'>Welcome to Mainframe</p>
        <nav>
          <Link to="/posts" className='navlink'>POSTS</Link>
          <br></br>
          <Link to="/about" className='navlink'>ABOUT</Link>
        <p>Counter: {count}</p>
        <button onClick={() => setCount(count + 1)}>
          Add
        </button>
        </nav>
    </div>
  );
}

export default App;
