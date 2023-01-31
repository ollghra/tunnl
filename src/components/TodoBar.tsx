import { FieldValues, useForm } from "react-hook-form";
import "./TodoBar.sass";

export const TodoBar = ({ onAddTodo }: { onAddTodo: (text: string, time: Date) => void }) => {
    const { handleSubmit, register, formState: { errors }, reset } = useForm();

    const onSubmit = (data: { text: string, time: string }) => {
        const text = data.text;
        const time = new Date(data.time);
        onAddTodo(text, time);
        reset();
    }

    return <form onSubmit={handleSubmit((data: FieldValues, event) => {
            onSubmit({
                time: data['time'],
                text: data['text']
            })
        })}
        className="todo-bar">
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
            <button type="submit" className="primary">Add</button>
        </form>
}
