import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <nav className='loginMenu'>
            <h2>Login menu</h2>
            <form>
                <label>Username: </label>
                <input type='text'></input>
                <br />
                <label>Password: </label>
                <input type='text'></input>
                <br />
                
                <button className='darkButton'>Login</button>
                
                <button className='darkButton'>
                    <Link to='/register'>Register</Link>
                </button>
            </form>
        </nav>
    )
}

export default Menu;