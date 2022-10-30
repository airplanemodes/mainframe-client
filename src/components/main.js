import Header from './header';
import Footer from './footer';
import './main.css';
import Feed from './feed';

export default function Main() {
    return (
        <div>
            <Header />
                <Feed />
            <Footer />
        </div>
    )
};