import React, { useReducer, useEffect } from 'react';
import appReducer from './reducer';
import UserBar from "./UserBar";
import TodoForm from "./TodoForm";
import ListTodo from "./ListTodo";
import { StateContext } from './context';
import { useResource } from 'react-request-hook';
import './style.css';

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: [],
  });

  const [todosResponse, getTodos] = useResource(() => ({
    url: "/todo",
    method: "get",
    headers: {
      Authorization: `${state?.user?.access_token}`
    }
  }));

  useEffect(() => {
    if (state?.user?.access_token) {
      getTodos();
    }
  }, [state?.user?.access_token, getTodos]);

  useEffect(() => {
    if (todosResponse && todosResponse.data) {
      dispatch({ type: "FETCH_TODO", todos: todosResponse.data.todos.reverse() });
    }
  }, [todosResponse, dispatch]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <div>
        <UserBar />
        {state.user && state.user.email && <TodoForm />}
        <ListTodo />
      </div>
    </StateContext.Provider>
  );
}

export default App;