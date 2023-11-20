import { useState, useContext, useEffect } from "react";
import { useResource } from 'react-request-hook';
import { StateContext } from "./context";

export default function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { state, dispatch } = useContext(StateContext);
    const { user } = state;
    const dateCreated = new Date().toISOString();

    const [todos, createTodo] = useResource(({ title, description, author, dateCreated, complete, dateCompleted }) => ({
        url: "/todos",
        method: "post",
        data: { title, description, author, dateCreated, complete, dateCompleted },
    }));

    const handleSubmit = e => {
        e.preventDefault();
        createTodo({
            title,
            description,
            author: user,
            dateCreated,
            complete: false,
            dateCompleted: null
        });
    }

    useEffect(() => {
        if (todos && todos.data) {
            console.log('New Todo Created:', todos.data);
            dispatch({ type: "CREATE_TODO", ...todos.data });
            setTitle("");
            setDescription("");
        }
    }, [todos?.data]);

    return (
        <form onSubmit={handleSubmit}>
            <div>Author: <b>{user}</b></div>
            <div>
                <label htmlFor="create-title">Title:</label>
                <input type="text" name="create-title" id="create-title" value={title} onChange={(event) => setTitle(event.target.value)} />
            </div>
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
            <input type="submit" value="Create" />
        </form>
    )
}