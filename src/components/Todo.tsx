import React, { FC, useState } from 'react';
import '../assets/styles/todo.css';
import { ITodo } from '../models/todo.model';

interface ITodoProps {
    todo: ITodo;
    handleDelete: (id: string) => void;
    handleCheckboxChange: (id: string) => void;
    handleSaveTodo: (input: string, id: string) => void;
}

const Todo: React.FC<ITodoProps> = (props: ITodoProps) => {
    const {todo, handleDelete, handleCheckboxChange, handleSaveTodo} = props;

    const [input, setInput] = useState(todo.title);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        if (input) {
            setIsEditing(prev => !prev);
            handleSaveTodo(input, todo.id);
        }
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
                            checked={todo.completed}
                            className='checkbox'
                            onChange={() => handleCheckboxChange(todo.id)}
                        />
                        <label htmlFor={todo.id} className='todo-label'>
                            {todo.title}
                        </label>
                    </div>

                    <div>
                        <button className='todo-btn' onClick={() => setIsEditing(prev => !prev)}>
                            Edit
                        </button>
                        <button className='todo-btn' onClick={() => handleDelete(todo.id)}>
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
                        <button className='todo-btn' onClick={handleSave}>
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Todo;
