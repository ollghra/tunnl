import { useEffect, useState } from "react";
import { EMPTY_DATE } from "../pages/WFWPage";
import { createTodo, Todo } from "../types/Todo";
import { TodoBar } from "./TodoBar";
import "./TodoLI.sass";

export const TodoLI = ({ onDone, onDelete, todo }: { onDone: (done: boolean) => void, onDelete: () => void, todo: Todo }) => {
    const [done, setDone] = useState(todo.done);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        setDone(todo.done);
    }, [todo]);


    const onUpdatedTodo = (newText: string, newTime: Date) => {
        const _todo: Todo = createTodo(newText, newTime, todo.id, done);
        console.debug(`TODO [${_todo.id.toString()}] is now ${JSON.stringify(_todo)}`);
    }

    const onEditClick = () => {
        setEditing(true);
    }
    const onSaveClick = () => {
        setEditing(false);
    }
    const onCancelClick = () => {
        setEditing(false);
    }

    return <li className="todo-li">
        <span className="text-container">
            <input type="checkbox"
                onClick={() => {
                    const _done = !done;
                    setDone(_done);
                    onDone(_done);

                }}
                onChange={(e) => { }} checked={done} />
            {
                editing ?
                    <TodoBar onAddTodo={onUpdatedTodo} />
                    // Add initial value of a todo to the above and make it not break the line
                    :
                    <span className={`todo-li-text ${done && 'done'}`}>
                        {todo.text}
                        {todo.time.getTime() != EMPTY_DATE && <span>
                            <b> for </b> {todo.time.toLocaleString()}
                        </span>}
                    </span>
            }
        </span>
        <span className="controls">
            {editing ?
                <>
                    <button onClick={onCancelClick}>Cancel</button>
                    <button onClick={onSaveClick} className="primary">Save</button>
                </>
                :
                <>
                    <button onClick={onEditClick}>Edit</button>
                    <button onClick={onDelete}>Delete</button>
                </>
            }
        </span>
    </li>
}