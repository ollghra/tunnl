import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from "react-hook-form";

interface Todo {
    text: string;
    time: Date;
}

const TodoForm= ({ onAddTodo }: {onAddTodo: (text: string, time: Date) => void}) => {
    const { handleSubmit, register, formState: { errors } } = useForm();

    const onSubmit = (data: { text: string, time: string }) => {
        const text = data.text;
        const time = new Date(data.time);
        onAddTodo(text, time);
    }

    return (
        <form onSubmit={handleSubmit((data: FieldValues, event) => {
            onSubmit({
                time: data['time'],
                text: data['text']
            })
        })}>
            <input
                type="text"
                placeholder="Add Todo"
                {...register('text', { required: true })}
            />
            {errors.text && <span>This field is required</span>}
            <input
                type="datetime-local"
                {...register('time', { required: false })}
            />
            <button type="submit">Add</button>
        </form>
    )
}

const WFWPage: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    // useEffect(() => {
        // const storedTodos: Array<Todo> = JSON.parse(localStorage.getItem('todos') || '[]');
        
    // }, [todos]);

    const updateTodos = (newTodo: Todo) => {
        const _todos = [...todos, newTodo];
        setTodos(_todos)
        localStorage.setItem('todos', JSON.stringify(_todos));
    }
    const addTodo = (text: string, time: Date) => {
        updateTodos({text, time});
    }

    const removeTodo = (index: number) => {
        const _todos = [...todos];
        _todos.splice(index, 1);
        setTodos(_todos);
        localStorage.setItem('todos', JSON.stringify(_todos));
    }
    const removeAllTodos = () => {
        setTodos([]);
        localStorage.removeItem('todos');
    }

    return (
        <div>
            <h1>Todo List</h1>
            <TodoForm onAddTodo={addTodo} />
            <button onClick={removeAllTodos}>Clear todos</button>
            <ul>
                {todos.map((todo, index) => {
                    if (todo.time > new Date() || todo.time == null) {
                        return <li key={index}>{todo.text}</li>
                    }
                })}
            </ul>
        </div>
    );
}

export default WFWPage;
