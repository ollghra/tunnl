import React, { useEffect, useState } from 'react';
import { ObjectId } from 'bson';
import { TodoBar } from '../components/TodoBar';
import { TodoLI } from '../components/TodoLI';
import { createTodo, Todo, Todos } from '../types/Todo';
import { Separator } from '../components/Separator';

export const EMPTY_DATE: number = new Date('1970-01-01T00:00:00Z').getTime();

export const WFWPage: React.FC = () => {
    const [todos, setTodos] = useState<Record<string, Todo>>({});

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            let _todos: Todos = JSON.parse(storedTodos);
            _todos = Object.entries(_todos).reduce<Todos>((retTodos, curTodo) => {
                retTodos[curTodo[0]] = {
                    ...curTodo[1],
                    id: new ObjectId(curTodo[1].id),
                    time: new Date(curTodo[1].time),
                    created: new Date(curTodo[1].created)//.getTime() === EMPTY_DATE ? new Date() : new Date(curTodo[1].created)
                }
                return retTodos;
            }, {})
            setTodos(_todos);
        }
    }, []);

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
            <h1>Impossible is a dare</h1>
            <h3>WhatForWhen</h3>
            <TodoBar onAddTodo={addTodo} />
            <Separator title='upcoming' />
            <ul>
                {Object.values(todos).filter((todo) => !todo.done && todo.time.getTime() !== EMPTY_DATE && todo.time >= new Date())
                .sort((a, b) => a.time.getTime() - b.time.getTime()).map((todo, index) =>
                    <TodoLI key={index} onDone={(done) => updateTodo(todo.id, { ...todo, done })}
                        onDelete={() => removeTodo(todo.id)}
                        todo={todo} />
                )}
            </ul>
            <Separator title='late' />
            <ul>
                {Object.values(todos).filter((todo) => !todo.done && todo.time.getTime() !== EMPTY_DATE && todo.time <= new Date()).map((todo, index) =>
                    <TodoLI key={index} onDone={(done) => updateTodo(todo.id, { ...todo, done })}
                    onDelete={() => removeTodo(todo.id)}
                    todo={todo} />
                )}
            </ul>
            <Separator title='backlog' />
            <ul>
                {Object.values(todos).filter((todo) => !todo.done && todo.time.getTime() === EMPTY_DATE)
                .sort((a, b) => b.created.getTime() - a.created.getTime()).map((todo, index) =>
                    <TodoLI key={todo.id.toString()}
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
