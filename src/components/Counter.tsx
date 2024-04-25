import React, { useState } from 'react';
import { ITodo } from '../models/todo.model';

interface ICounterProps {
    task: ITodo[]
}

const Counter: React.FC<ICounterProps> = (props: ICounterProps) => {
    const task = props.task;

return (
 <h2 className='title-counter'>
    {task.length} {task.length > 1 ? 'tasks' : 'task'} remaining
 </h2>
)
}

export default Counter;