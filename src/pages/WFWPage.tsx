import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from "react-hook-form";
import { ObjectId } from 'bson';

interface Todo {
    id: ObjectId;
    text: string;
    time: Date;
    done: boolean;
}

export const TodoForm= ({ onAddTodo }: {onAddTodo: (text: string, time: Date) => void}) => {
    const { handleSubmit, register, formState: { errors }, reset } = useForm();

    const onSubmit = (data: { text: string, time: string }) => {
        const text = data.text;
        const time = new Date(data.time);
        onAddTodo(text, time);
        reset();
    }

    return (
        <form onSubmit={handleSubmit((data: FieldValues, event) => {
            onSubmit({
                time: data['time'],
                text: data['text']
            })
        })}>
            <label htmlFor='text'>What: </label>
            <input
                type="text"
                placeholder="What"
                {...register('text', { required: true })}
            />
            {/* {errors.text && <span>This field is required</span>} */}
            <b> for </b>
            <label htmlFor='time'> when: </label>
            <input
                type="datetime-local"
                title='When'
                {...register('time', { required: false })}
            />
            <button type="submit">Add</button>
        </form>
    )
}

export const TodoLI = ({onDone, todo}: {onDone: (done: boolean) => void, todo: Todo}) => {
    const [done, setDone] = useState(false);
    return <li>
        <input type="checkbox" onClick={() => {
            const _done = !done;
            setDone(_done);
            onDone(_done);
        }}/>
        {todo.text} {todo.time != null && <span><b> for </b> {todo.time.toLocaleString()}</span>}
        </li>
}

type Todos = {[key: string]: Todo};
const WFWPage: React.FC = () => {
    const [todos, setTodos] = useState<Record<string, Todo>>({});

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    useEffect(() => {
        console.debug(`todos changed to : ${JSON.stringify(todos)}`);
    }, [todos]);

    const createTodo = (text: string, time: Date, _id?: string|ObjectId, done?: boolean): Todo => {
        return {
            id: _id instanceof ObjectId ? _id : new ObjectId(_id),
            text: text,
            time: time,
            done: done || false
        }
    }
    const addTodo = (text: string, time: Date) => {
        const _todos: Todos = {...todos};
        const _todo: Todo = createTodo(text, time);
        _todos[_todo.id.toString()] = _todo;
        setTodos(_todos);
        localStorage.setItem('todos', JSON.stringify(_todos));
    }

    const updateTodo = (id: ObjectId, newTodo: Todo) => {
        const _todos: Todos = {...todos};
        _todos[id.toString()] = newTodo;
        setTodos(_todos);
        localStorage.setItem('todos', JSON.stringify(_todos));
    }
    const removeTodo = (id: ObjectId) => {
        const _todos: Todos = {...todos};
        delete _todos[id.toString()];
        setTodos(_todos);
        localStorage.setItem('todos', JSON.stringify(_todos));
    }
    const removeAllTodos = () => {
        setTodos({});
        localStorage.removeItem('todos');
    }

    return (
        <div>
            <h1>Todo List</h1>
            <TodoForm onAddTodo={addTodo} />
            <button onClick={removeAllTodos}>Clear todos</button>
            <ul>
                {Object.values(todos).map((todo, index) =>
                    // if (todo.time > new Date() || todo.time == null) {
                        <TodoLI key={index} onDone={(done)=>updateTodo(todo.id, {...todo, done})}
                        todo={todo}/>
                    // }
                )}
            </ul>
        </div>
    );
}

export default WFWPage;
