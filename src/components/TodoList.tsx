import { FC, useState } from 'react';
import { ITodo } from '../models/todo.model';
import '../assets/styles/todo.css';
import Todo from './Todo';
import Counter from './Counter';
import Input from './Input';

const TodoList: React.FC = () => {
    const [task, setTask] = useState<ITodo[]>(JSON.parse(localStorage.getItem('todoList')!) || []);
    const [filter, setFilter] = useState('all');

    const handleDelete = (id: string) => {
        setTask(prevTask => prevTask.filter(item => item.id !== id));
    };

    const handleAdd = (item: ITodo) => {
        setTask(prevTask => [...prevTask, item]);
    };

    const handleCheckboxChange = (id: string) => {
      setTask((prevTask) => {
        const updatedTask = prevTask.map((task) => {
          if (task.id === id) {
            return { ...task, completed: !task.completed };
          }
          return task;
        });
        return updatedTask;
      });
    };

    const handleSaveTodo = () => {
        localStorage.setItem('todoList', JSON.stringify(task));
      }; 

    localStorage.setItem('todoList', JSON.stringify(task));
    
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
            <Counter task={task} />
            {task
                .filter(task => {
                    if (filter === 'all') {
                        return true;
                    }
                    if (filter === 'active') {
                        return !task.completed;
                    }
                    if (filter === 'completed') {
                        return task.completed;
                    }
                        return false;
          
                })
                .map(item => (
                    <Todo todo={item} handleDelete={handleDelete} key={item.id} handleCheckboxChange={handleCheckboxChange} handleSaveTodo={handleSaveTodo} />
                ))}
        </div>
    );
};

export default TodoList;
