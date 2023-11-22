import { useState, useContext, useEffect } from "react";
import { useResource } from 'react-request-hook';
import { StateContext } from "./context";

export default function TodoForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { state, dispatch } = useContext(StateContext);
    const { user } = state;

    const [todos, TodoForm] = useResource(({ title, description }) => ({
        url: "/todo",
        method: "post",
        headers: {
            "Authorization": `${user.access_token}`
        },
        data: { title, description, author: user._id } // Using user's _id as author
    }));

    const handleSubmit = e => {
        e.preventDefault();
        TodoForm({
            title,
            description
        });
    }

    useEffect(() => {
        if (todos && todos.isLoading === false && todos.data) {
            dispatch({ type: "CREATE_TODO", ...todos.data });
            setTitle("");
            setDescription("");
        }
    }, [todos, dispatch]);

    return (
        <form onSubmit={handleSubmit}>
            <div>Author: <b>{user.email}</b></div>
            <div>
                <label htmlFor="create-title">Title:</label>
                <input type="text" name="create-title" id="create-title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="submit" value="Create" />
        </form>
    );
}