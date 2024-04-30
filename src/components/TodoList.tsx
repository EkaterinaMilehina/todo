import { FC, useState } from 'react';
import { ITodo } from '../models/todo.model';
import '../assets/styles/todo.css';
import Todo from './Todo';
import Input from './Input';

const TodoList: React.FC = () => {
    const [task, setTask] = useState<ITodo[]>(JSON.parse(localStorage.getItem('todoList') || '[]'));
    const [filter, setFilter] = useState('all');

    const updateLocalStorage = (updatedTaskList: ITodo[]) => {
        localStorage.setItem('todoList', JSON.stringify(updatedTaskList));
    };

    const handleDelete = (id: string) => {
        setTask(prevTask => {
            const updatedTaskList = prevTask.filter(item => item.id !== id);
            updateLocalStorage(updatedTaskList);
            return updatedTaskList;
        });
    };

    const handleAdd = (item: ITodo) => {
        setTask(prevTask => {
            const updatedTaskList = [...prevTask, item];
            updateLocalStorage(updatedTaskList);
            return updatedTaskList;
        });
    };

    const handleCheckboxChange = (id: string) => {
        setTask(prevTask => {
            const updatedTaskList = prevTask.map(task => {
                if (task.id === id) {
                    return { ...task, completed: !task.completed };
                }
                return task;
            });
            updateLocalStorage(updatedTaskList);
            return updatedTaskList;
        });
    };

    const handleSaveTodo = () => {
        updateLocalStorage(task);
    };

    const filters: Record<string, (task: ITodo) => boolean> = {
        all: () => true,
        active: (task: ITodo) => !task.completed,
        completed: (task: ITodo) => task.completed,
    };
    const filteredTasks = task.filter(filters[filter]);
    
    return (
        <div>
            <h1 className='title'>Todont</h1>
            <Input handleAdd={handleAdd} />
            <div>
                <button className='todo-btn filter-btn' onClick={() => setFilter('all')}>
                    Show All Tasks
                </button>
                <button className='todo-btn filter-btn' onClick={() => setFilter('active')}>
                    Show Active Tasks
                </button>
                <button className='todo-btn filter-btn' onClick={() => setFilter('completed')}>
                    Show Completed Tasks
                </button>
            </div>
            <h2 className='title-counter'>
                {task.length} {task.length > 1 ? 'tasks' : 'task'} remaining
            </h2>
            {filteredTasks.map(item => (
                <Todo
                    todo={item}
                    handleDelete={handleDelete}
                    key={item.id}
                    handleCheckboxChange={handleCheckboxChange}
                    handleSaveTodo={handleSaveTodo}
                />
            ))}
        </div>
    );
};

export default TodoList;
