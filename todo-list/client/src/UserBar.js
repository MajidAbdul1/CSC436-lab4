import Login from './Login'
import Logout from './Logout'
import Register from './Register'
import { StateContext } from './context'
import { useContext } from 'react'

export default function UserBar() {
    const { state } = useContext(StateContext);

    if (state.user) {
        return <Logout />
    }
    else {
        return (
            <>
                <Login />
                <Register />
            </>
        )
    }
}