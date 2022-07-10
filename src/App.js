import './App.css';
import Header from './components/Header';
import Menu from './components/Menu';
import Feed from './components/Feed';
import AddPost from './components/AddPost';
import Footer from './components/Footer';
import About from './components/About';

function App() {

  return (
    <div className="App">
      <div className='grid'>
        <div><Header /></div>
        <div><Menu /></div>
        <div><Feed /></div>
        <div><AddPost /></div>
        <div><About /></div>
        <div><Footer /></div>
      </div>
    </div>
  );
}

export default App;
