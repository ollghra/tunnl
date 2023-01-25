import React, { useEffect, useState } from 'react';
import { ObjectId } from 'bson';
import { TodoBar } from '../components/TodoBar';
import { TodoLI } from '../components/TodoLI';
import { Todo, Todos } from '../types/Todo';
import { Separator } from '../components/Separator';

const EMPTY_DATE: number = new Date('1970-01-01T00:00:00Z').getTime();

const WFWPage: React.FC = () => {
    const [todos, setTodos] = useState<Record<string, Todo>>({});

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            let _todos: Todos = JSON.parse(storedTodos);
            _todos = Object.entries(_todos).reduce<Todos>((retTodos, curTodo) => {
                retTodos[curTodo[0]] = { ...curTodo[1], id: new ObjectId(curTodo[1].id),
                    time: new Date(curTodo[1].time) }
                return retTodos;
            }, {})
            setTodos(_todos);
        }
    }, []);

    useEffect(() => {
        console.debug(`todos changed to : ${JSON.stringify(todos)}`);
    }, [todos]);

    const createTodo = (text: string, time: Date, _id?: string | ObjectId, done?: boolean): Todo => {
        return {
            id: _id instanceof ObjectId ? _id : new ObjectId(_id),
            text: text,
            time: time,
            done: done || false
        }
    }
    const addTodo = (text: string, time: Date) => {
        const _todos: Todos = { ...todos };
        const _todo: Todo = createTodo(text, time);
        _todos[_todo.id.toString()] = _todo;
        setTodos(_todos);
        localStorage.setItem('todos', JSON.stringify(_todos));
    }

    const updateTodo = (id: ObjectId, newTodo: Todo) => {
        const _todos: Todos = { ...todos };
        _todos[id.toString()] = newTodo;
        setTodos(_todos);
        localStorage.setItem('todos', JSON.stringify(_todos));
    }
    const removeTodo = (id: ObjectId) => {
        const _todos: Todos = { ...todos };
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
            <TodoBar onAddTodo={addTodo} />
            {/* <button onClick={removeAllTodos}>Delete all todos</button> */}
            <Separator title='late' />
            <ul>
                {Object.values(todos).filter((todo) => !todo.done && todo.time.getTime() !== EMPTY_DATE && todo.time <= new Date()).map((todo, index) =>
                    <TodoLI key={index} onDone={(done) => updateTodo(todo.id, { ...todo, done })}
                    onDelete={() => removeTodo(todo.id)}
                    todo={todo} />
                )}
            </ul>
            <Separator title='upcoming' />
            <ul>
                {Object.values(todos).filter((todo) => !todo.done && todo.time.getTime() !== EMPTY_DATE && todo.time >= new Date()).map((todo, index) =>
                    <TodoLI key={index} onDone={(done) => updateTodo(todo.id, { ...todo, done })}
                        onDelete={() => removeTodo(todo.id)}
                        todo={todo} />
                )}
            </ul>
            <Separator title='backlog' />
            <ul>
                {Object.values(todos).filter((todo) => !todo.done && todo.time.getTime() === EMPTY_DATE).map((todo, index) =>
                    <TodoLI key={index}
                        onDone={(done) => updateTodo(todo.id, { ...todo, done })}
                        onDelete={() => removeTodo(todo.id)}
                        todo={todo} />
                )}
            </ul>
            <Separator title='done' />
            <ul>
                {Object.values(todos).filter((todo) => todo.done).map((todo, index) =>
                    <TodoLI key={index} onDone={(done) => updateTodo(todo.id, { ...todo, done })}
                        onDelete={() => removeTodo(todo.id)}
                        todo={todo} />
                )}
            </ul>
        </div>
    );
}

export default WFWPage;
