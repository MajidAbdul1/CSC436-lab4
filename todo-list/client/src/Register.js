import { useState, useEffect, useContext } from 'react'
import { useResource } from 'react-request-hook'
import { StateContext } from './context'

export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [success, setSuccess] = useState(false);
    const { dispatch } = useContext(StateContext);

    const [user, register] = useResource((username, password) => ({
        url: "/users",
        method: "post",
        data: { email: username, password },
    }));

    useEffect(() => {
        if (user && user.data) {
            dispatch({ type: "REGISTER", username: user.data.email });
            setSuccess(true);
        }
    }, [user, dispatch]);

    const handleSubmit = e => {
        e.preventDefault();
        register(username, password);
    }

    return (
        <form onSubmit={handleSubmit}>
            {success && <p>Registration successful! Please log in.</p>}
            <label htmlFor="register-username">Username:</label>
            <input type="text" value={username} onChange={evt => setUsername(evt.target.value)} name="register-username" id="register-username" />
            <label htmlFor="register-password">Password:</label>
            <input type="password" name="register-password" id="register-password" value={password}
                onChange={evt => setPassword(evt.target.value)} />
            <label htmlFor="register-password-repeat">Repeat password:</label>
            <input type="password" name="register-password-repeat" id="register-password-repeat" value={passwordRepeat}
                onChange={evt => setPasswordRepeat(evt.target.value)} />
            <input type="submit" value="Register" disabled={username.length === 0 || password.length === 0 || password !== passwordRepeat} />
        </form>
    )
}