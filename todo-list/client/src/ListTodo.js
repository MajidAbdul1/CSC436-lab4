import React, { useContext, useEffect } from 'react';
import Todo from './Todo';
import { StateContext } from './context';

export default function TodoList() {
    const { state, dispatch } = useContext(StateContext);
    const { todos } = state;

    // Filter out the default list if it exists
    const filteredTodos = todos.filter(todo => todo.title !== 'Default List');

    useEffect(() => {
        console.log('useEffect: Todos', todos)
    }, [todos, dispatch]);

    return (
        <div>
            {filteredTodos.map((todo) => (
                <Todo {...todo} key={todo.id} dispatch={dispatch} />
            ))}
        </div>
    );
}
