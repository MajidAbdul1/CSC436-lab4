import { useContext } from 'react'
import Todo from './Todo'
import { StateContext } from './context'

export default function ListTodo() {
    const { state, dispatch } = useContext(StateContext);
    const { todos } = state;

    return (
        <div>
            {todos.length === 0 && <h2>No todos found.</h2>}
            {todos.length > 0 && todos.map((todo) => <Todo {...todo} key={todo._id || todo.id} dispatch={dispatch} />)}
        </div>
    )
}