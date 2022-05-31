import React, { useState, useRef, useCallback, useReducer } from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
// import { useReducer } from "../node_modules/react/cjs/react.development";

function createBulkTodos() {
    const array = [];
    for (let i = 1; i <= 3500; i++) {
        array.push({
            id: i,
            text: <div>할일 {i}</div>,
            checked: false,
        });
    }
    return array;
}

function todoReducer(todos, action) {
    switch (action.type) {
        case "INSERT": // 새로 추가
            // { type: "INSERT", todo: { id: 1, text: "todo", checked: false } }
            return todos.concat(action.todo);
        case "REMOVE": // 제거
            // { type: "REMOVE", id: 1 }
            return todos.filter((todo) => todo.id !== action.id);
        case "TOGGLE": // 토글
            // { type: "REMOVE", id: 1 }
            return todos.map((todo) =>
                todo.id === action.id
                    ? { ...todo, checked: !todo.checked }
                    : todo,
            );
        default:
            return todos;
    }
}

const App = () => {
    // const [todos, setTodos] = useState(createBulkTodos);
    const [todos, dispatch] = useReducer(
        todoReducer,
        undefined, // 이렇게 해야 createBulkTodos가 한번만 실행됨.
        createBulkTodos,
    );

    // 고유 값으로 사용 될 id
    // ref 를 사용하여 변수 담기
    const nextId = useRef(4);

    // const onInsert = useCallback((text) => {
    //     const todo = {
    //         id: nextId.current,
    //         text,
    //         checked: false,
    //     };
    //     setTodos((todos) => todos.concat(todo));
    //     nextId.current += 1; // nextId 1 씩 더하기
    // }, []);

    // const onRemove = useCallback((id) => {
    //     setTodos((todos) => todos.filter((todo) => todo.id !== id));
    // }, []);

    // const onToggle = useCallback((id) => {
    //     setTodos((todos) =>
    //         todos.map((todo) =>
    //             todo.id === id ? { ...todo, checked: !todo.checked } : todo,
    //         ),
    //     );
    //     // setTodos(
    //     //     todos.map((todo) =>
    //     //         todo.id === id ? { ...todo, checked: !todo.checked } : todo,
    //     //     ),
    //     // );
    // }, []);

    const onInsert = useCallback((text) => {
        const todo = {
            id: nextId.current,
            text,
            checked: false,
        };
        dispatch({ type: "INSERT", todo });
        nextId.current += 1; // nextId 1씩 더하기
    }, []);

    const onRemove = useCallback((id) => {
        dispatch({ type: "REMOVE", id });
    }, []);

    const onToggle = (id) => {
        console.log("jello");
        dispatch({ type: "TOGGLE", id });
    };

    return (
        <TodoTemplate>
            <TodoInsert />
            <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
        </TodoTemplate>
    );
};

export default App;
