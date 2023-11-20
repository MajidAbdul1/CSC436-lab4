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
    url: "/todos",
    method: "get",
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todos = await getTodos(); // Await the result of getTodos
        dispatch({ type: "FETCH_TODO", todos: todos.data.reverse() });
      } catch (error) {
        // Handle error
        console.error('Error fetching todos:', error);
      }
    };

    fetchData();
  }, [getTodos]); // Include getTodos in the dependency array

  useEffect(() => {
    if (todosResponse && todosResponse.data) {
      dispatch({ type: "FETCH_TODO", todos: todosResponse.data.reverse() });
    }
  }, [todosResponse]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <div>
        <UserBar />
        {state.user && <TodoForm />}
        <ListTodo />
      </div>
    </StateContext.Provider>
  );
}

export default App;
