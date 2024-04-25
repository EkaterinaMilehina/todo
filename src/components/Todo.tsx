import React, { FC, useState } from 'react';
import '../assets/styles/todo.css';
import { ITodo } from '../models/todo.model';

interface ITodoProps {
    todo: ITodo;
    handleDelete: (id: string) => void;
    handleCheckboxChange: (id: string) => void;
    handleSaveTodo: () => void;
}

const Todo: React.FC<ITodoProps> = (props: ITodoProps) => {
    const todo = props.todo;

    const [completed, setCompleted] = useState(todo.completed);
    const [input, setInput] = useState(todo.title);
    const [isEditing, setIsEditing] = useState(false);

    const handleCheckboxChange = () => {
        setCompleted(!completed);
        props.handleCheckboxChange(todo.id);
    };

    const handleSaveTodo = () => {
        if (input) {
            todo.title = input;
            setIsEditing(prev => !prev);
        }
        props.handleSaveTodo();
    };

    const handleCancelTodo = () => {
        setInput(todo.title);
        setIsEditing(prev => !prev);
    };

    return (
        <div>
            {!isEditing ? (
                <div>
                    <div>
                        <input
                            type='checkbox'
                            id={todo.id}
                            checked={completed}
                            className='checkbox'
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor={todo.id} className='todo-label'>
                            {todo.title}
                        </label>
                    </div>

                    <div>
                        <button className='todo-btn' onClick={() => setIsEditing(prev => !prev)}>
                            Edit
                        </button>
                        <button className='todo-btn' onClick={() => props.handleDelete(todo.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <input
                        type='text'
                        placeholder='New todo...'
                        className='todo-input'
                        value={input}
                        onChange={event => setInput(event.target.value)}
                    />
                    <div>
                        <button className='todo-btn' onClick={handleCancelTodo}>
                            Cancel
                        </button>
                        <button className='todo-btn' onClick={handleSaveTodo}>
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Todo;
