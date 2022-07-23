import './App.css';
import Header from './components/Header';
import Menu from './components/Menu';
import Feed from './components/Feed';
import Footer from './components/Footer';
import About from './components/About';

function App() {

  return (
    <div className="App">
        <Header />
        <Menu />
        <Feed />
        <About />
        <Footer />
    </div>
  );
}

export default App;
