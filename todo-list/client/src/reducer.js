function userReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                email: action.user.email,
                access_token: action.user.access_token
            };
        case "REGISTER":
            return state;
        case "LOGOUT":
            return "";
        default:
            return state;
    }
}

function todoReducer(state, action) {
    switch (action.type) {
        case "CREATE_TODO":
            const newTodo = {
                _id: action._id,
                title: action.title,
                description: action.description,
                author: action.author,
                dateCreated: action.dateCreated,
                complete: action.complete,
                dateCompleted: action.dateCompleted
            };
            return [newTodo, ...state];
        case "FETCH_TODO":
            return action.todos;
        case "TOGGLE_TODO":
            return state.map(todo =>
                todo._id === action.todo._id ? { ...todo, ...action.todo } : todo
            );
        case "DELETE_TODO":
            return state.filter(todo => todo._id !== action._id);
        case "CLEAR_TODO":
            return [];
        default:
            return state;
    }
}

export default function appReducer(state, action) {
    return {
        user: userReducer(state.user, action),
        todos: todoReducer(state.todos, action),
    };
}