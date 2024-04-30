import { FC, useState } from 'react';
import { ITodo } from '../models/todo.model';
import '../assets/styles/todo.css';
import Todo from './Todo';
import Input from './Input';

enum Filter {
    All = 'all',
    Active = 'active',
    Completed = 'completed',
}

const TodoList: React.FC = () => {
    const [tasks, setTasks] = useState<ITodo[]>(JSON.parse(localStorage.getItem('todoList') || '[]'));
    const [filter, setFilter] = useState(Filter.All);

    const updateLocalStorage = (updatedTaskList: ITodo[]) => {
        localStorage.setItem('todoList', JSON.stringify(updatedTaskList));
    };

    const handleDelete = (id: string) => {
        const updatedTaskList = tasks.filter(item => item.id !== id);
        updateLocalStorage(updatedTaskList);
        setTasks(updatedTaskList);
    };

    const handleAdd = (item: ITodo) => {
        const updatedTaskList = [...tasks, item];
        updateLocalStorage(updatedTaskList);
        setTasks(updatedTaskList);
    };

    const handleCheckboxChange = (id: string) => {
        const updatedTaskList = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        updateLocalStorage(updatedTaskList);
        setTasks(updatedTaskList);
    };

    const handleSaveTodo = (input: string, id: string) => {
        const updatedTaskList = tasks.map(task => {
            if (task.id === id) {
                return { ...task, title: input };
            }
            return task;
        });
        updateLocalStorage(updatedTaskList);
        setTasks(updatedTaskList);
    };

    const filters: Record<string, (task: ITodo) => boolean> = {
        all: () => true,
        active: (task: ITodo) => !task.completed,
        completed: (task: ITodo) => task.completed,
    };
    const filteredTasks = tasks.filter(filters[filter]);

    const todoCounter = `${tasks.length} ${tasks.length > 1 ? 'tasks' : 'task'} remaining`;

    return (
        <div>
            <h1 className='title'>Todont</h1>
            <Input handleAdd={handleAdd} />
            <div>
                <button className='todo-btn filter-btn' onClick={() => setFilter(Filter.All)}>
                    Show All Tasks
                </button>
                <button className='todo-btn filter-btn' onClick={() => setFilter(Filter.Active)}>
                    Show Active Tasks
                </button>
                <button className='todo-btn filter-btn' onClick={() => setFilter(Filter.Completed)}>
                    Show Completed Tasks
                </button>
            </div>
            <h2 className='title-counter'>{todoCounter}</h2>
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
