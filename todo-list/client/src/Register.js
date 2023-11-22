import { useState, useEffect, useContext } from 'react'
import { useResource } from 'react-request-hook'
import { StateContext } from './context'

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [status, setStatus] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const { dispatch } = useContext(StateContext);

    const [user, register] = useResource((username, email, password, passwordConfirmation) => ({
        url: "/auth/register",
        method: "post",
        data: { username, email, password, passwordConfirmation },
    }));

    useEffect(() => {
        if (user && user.isLoading === false && (user.data || user.error)) {
            if (user.error) {
                setStatus("Registration failed, please try again later.");
                setIsRegistered(false);
            } else {
                dispatch({
                    type: "REGISTER",
                    user: {
                        username: user.data.username, // Username from registration response
                        email: user.data.email
                    }
                });
                setStatus("Registration successful. You may now login.");
                setIsRegistered(true);
                setUsername('');
                setEmail('');
                setPassword('');
                setPasswordRepeat('');
            }
        }
    }, [user, dispatch]);

    const handleSubmit = e => {
        e.preventDefault();
        register(username, email, password, passwordRepeat);
    }

    return (
        <>
            {isRegistered ? (
                <p>{status}</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <p>{status}</p>
                    <label htmlFor="register-username">Username:</label>
                    <input type="text" value={username} onChange={evt => setUsername(evt.target.value)} name="register-username" id="register-username" />
                    <label htmlFor="register-email">Email:</label>
                    <input type="email" value={email} onChange={evt => setEmail(evt.target.value)} name="register-email" id="register-email" />
                    <label htmlFor="register-password">Password:</label>
                    <input type="password" name="register-password" id="register-password" value={password} onChange={evt => setPassword(evt.target.value)} />
                    <label htmlFor="register-password-repeat">Repeat password:</label>
                    <input type="password" name="register-password-repeat" id="register-password-repeat" value={passwordRepeat} onChange={evt => setPasswordRepeat(evt.target.value)} />
                    <input type="submit" value="Register" disabled={username.length === 0 || email.length === 0 || password.length === 0 || password !== passwordRepeat} />
                </form>
            )}
        </>
    )
}
