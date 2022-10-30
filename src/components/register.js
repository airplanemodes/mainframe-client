import './register.css';

export default function Register() {
    return (
        <div id='register'>
            <form>
                <h2>Create new user</h2>
                <table id='registerTable'>
                    <tr>
                        <td><label>Username: </label></td>
                        <td><input type={'text'} /></td>
                    </tr>
                    <tr>
                        <td><label>Email: </label></td>
                        <td><input type={'email'} /></td>
                    </tr>
                    <tr>
                        <td><label>Password: </label></td>
                        <td><input type={'password'} /></td>
                    </tr>
                </table>
                <br />
                <button>Create</button>
            </form>
            <br />
            <p>continue as <a href="/main">guest</a></p>
            <p>back to <a href="/">login</a></p>
        </div>
    )
};