import './enter.css';

export default function Enter() {
    return (
        <div id='enter'>
            <form>
                <h2>Please login</h2>
                <label>Username: </label>
                <input type={'text'} />
                <br />
                <label>Password: </label>
                <input type={'password'} />
                <br />
                <button>Login</button>
            </form>
            <br />
            <p>continue as <a href="/main">guest</a></p>
            <p>create new <a href="/register">user</a></p>
        </div>
    )
};