import { useState, useContext } from "react";
import { useResource } from 'react-request-hook';
import { StateContext } from './context';

export default function Todo({ title, description, author, dateCreated, complete, dateCompleted, _id }) {
    const { state, dispatch } = useContext(StateContext);
    const [isComplete, setComplete] = useState(complete);

    const [, updateTodo] = useResource(({ id, updatedTodo }) => ({
        url: `/todo/${id}`,
        method: "PUT",
        headers: {
            "Authorization": `${state.user.access_token}`
        },
        data: updatedTodo
    }));

    const [, deleteTodo] = useResource((id) => ({
        url: `/todo/${id}`,
        method: "DELETE",
        headers: {
            "Authorization": `${state.user.access_token}`
        }
    }));

    const handleToggle = () => {
        const updatedTodo = {
            title,
            description,
            author,
            dateCreated,
            complete: !isComplete,
            dateCompleted: !isComplete ? new Date().toISOString() : null
        };

        updateTodo({ id: _id, updatedTodo });
        setComplete(!isComplete);
        dispatch({ type: "TOGGLE_TODO", todo: { ...updatedTodo, _id } });
    };

    const handleDelete = () => {
        deleteTodo(_id);
        dispatch({ type: "DELETE_TODO", _id });
    };

    return (
        <div>
            <h3>{title}</h3>
            <div>{description}</div>
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