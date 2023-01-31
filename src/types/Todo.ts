import { ObjectId } from "bson";

export interface Todo {
    id: ObjectId;
    text: string;
    time: Date;
    done: boolean;
    created: Date;
}

export type Todos = {[key: string]: Todo};

export const createTodo = (text: string, time: Date, _id?: string | ObjectId, done?: boolean): Todo => {
    return {
        id: _id instanceof ObjectId ? _id : new ObjectId(_id),
        text: text,
        time: time,
        done: done || false,
        created: new Date()
    }
}