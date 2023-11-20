import { useState, useContext } from "react";
import { useResource } from 'react-request-hook';
import { StateContext } from './context';

export default function Todo({ title, description, author, dateCreated, complete, dateCompleted, id }) {
    const { dispatch } = useContext(StateContext);
    const [isComplete, setComplete] = useState(complete);

    const [todo, updateTodo] = useResource((todo) => ({
        url: `/todos/${todo.id}`,
        method: "PUT",
        data: todo,
    }));

    const [_, deleteTodo] = useResource((id) => ({
        url: `/todos/${id}`,
        method: "DELETE"
    }));

    const handleToggle = () => {
        const updatedTodo = {
            id,
            title,
            description,
            author,
            dateCreated,
            complete: !isComplete,
            dateCompleted: !isComplete ? new Date().toISOString() : null
        };

        updateTodo(updatedTodo);
        setComplete(!isComplete);
        dispatch({ type: "TOGGLE_TODO", todo: updatedTodo });
    };

    const handleDelete = () => {
        deleteTodo(id);
        dispatch({ type: "DELETE_TODO", id });
    };

    return (
        <div>
            <h3>{title}</h3>
            <div>{description}</div>
            <br />
            <i>Written by <b>{author}</b></i>
            <div>Created on: {new Date(dateCreated).toLocaleString()}</div>
            <div>Completed on: {isComplete ? new Date(dateCompleted).toLocaleString() : "Not completed"}</div>

            <div>
                <input
                    type="checkbox"
                    checked={isComplete}
                    onChange={handleToggle}
                />
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}