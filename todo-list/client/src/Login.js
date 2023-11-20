import React, { useState, useEffect } from 'react';
import { StateContext } from './context';
import { useContext } from 'react';
import { useResource } from 'react-request-hook';

export default function Login() {
    const [username, setUsername] = useState('');
    const { dispatch } = useContext(StateContext);
    const [loginFailed, setLoginFailed] = useState(false);
    const [password, setPassword] = useState('');
    const [loginAttempted, setLoginAttempted] = useState(false);

    function handleUsername(evt) {
        setUsername(evt.target.value);
    }

    function handlePassword(evt) {
        setPassword(evt.target.value);
    }

    const [user, login] = useResource((username, password) => ({
        url: "/login",
        method: "post",
        data: { email: username, password },
    }));

    useEffect(() => {
        if (loginAttempted && user) {
            if (user?.data?.user) {
                setLoginFailed(false);
                dispatch({ type: "LOGIN", username: user.data.user.email });
            } else {
                setLoginFailed(true);
            }
        }
    }, [user, dispatch, loginAttempted]);

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setLoginAttempted(true);
                    login(username, password);
                }}
            >
                <label htmlFor="login-username">Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={handleUsername}
                    name="login-username"
                    id="login-username"
                />
                <label htmlFor="login-password">Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={handlePassword}
                    name="login-password"
                    id="login-password"
                />
                <input type="submit" value="Login" disabled={username.length === 0} />
            </form>
            {loginAttempted && !username && !password && (
                <p style={{ color: 'red', marginTop: '10px' }}>
                    Please enter username and password.
                </p>
            )}
            {loginFailed && (
                <p style={{ color: 'red', marginTop: '10px' }}>
                    Invalid Credentials. Please try again.
                </p>
            )}
            {user?.data?.user && (
                <p style={{ color: 'green', marginTop: '10px' }}>
                    Login successful!
                </p>
            )}
        </div>
    );
}
