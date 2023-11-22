import React, { useState, useEffect, useContext } from 'react'
import { useResource } from 'react-request-hook'
import { StateContext } from './context'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginFailed, setLoginFailed] = useState(false)
    const { dispatch } = useContext(StateContext)

    const [user, login] = useResource((email, password) => ({
        url: "/auth/login",
        method: "post",
        data: { email, password },
    }));

    useEffect(() => {
        if (user && user.isLoading === false) {
            if (user.error || !user.data || !user.data.access_token) {
                if (user.error) setLoginFailed(true);
            } else {
                setLoginFailed(false)
                dispatch({
                    type: "LOGIN",
                    user: {
                        email: email,
                        access_token: user.data.access_token
                    }
                })
            }
        }
    }, [user, dispatch, email]);  // Include 'dispatch' and 'email' in the dependency array


    const handleSubmit = e => {
        e.preventDefault();
        setLoginFailed(false);
        login(email, password);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="login-email">Email:</label>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} name="login-email" id="login-email" />
                <label htmlFor="login-password">Password:</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="login-password" id="login-password" />
                <input type="submit" value="Login" disabled={email.length === 0 || password.length === 0} />
            </form>
            {loginFailed && <p>Login Failed. Please try again.</p>}
        </div>
    )
}