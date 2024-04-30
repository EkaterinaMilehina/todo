import React, { useState } from 'react';
import { ITodo } from "../models/todo.model";
import { v4 as uuidv4 } from 'uuid';

interface IInputProps {
    handleAdd: (item: ITodo) => void
}

const Input: React.FC<IInputProps> = (props: IInputProps) => {
    const {handleAdd} = props;
    const [valueInput, setValueInput] = useState('');

    const handleClickAdd = () => {
        if (valueInput !== '') {
            const todo: ITodo = {
                id: uuidv4(),
                title: valueInput,
                completed: false
            }
            handleAdd(todo);
            setValueInput('')
        }
    }

    return (
        <div className='todo-form'>
            <input type='text' placeholder='New todo...' className='todo-input' value={valueInput} onChange={(event) => setValueInput(event.target.value)}></input>
            <button className='todo-btn' onClick={handleClickAdd}>Add</button>
        </div>
        
    )
}

export default Input;