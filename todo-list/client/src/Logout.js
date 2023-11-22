import { StateContext } from './context';
import { useContext } from 'react';

export default function Logout() {
    const { state, dispatch } = useContext(StateContext);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        dispatch({ type: "CLEAR_TODO" }); // Clear todos on logout
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleLogout();
        }}>
            Logged in as: <b>{state.user.email}</b>
            <input type="submit" value="Logout" />
        </form>
    );
}