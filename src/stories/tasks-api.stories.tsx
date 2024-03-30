import React, { useState } from 'react';
import { todolistsAPI } from '../api/todolist-api';

export default {
    title: 'API',
};

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');

    const getTasks = () => {
        todolistsAPI.getTasks(todolistId).then((res) => {
            setState(res.data);
        });
    };

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input
                    placeholder="todolistId"
                    value={todolistId}
                    onChange={(e) => {
                        setTodolistId(e.currentTarget.value);
                    }}
                />
                <button onClick={getTasks}>delete task</button>
            </div>
        </div>
    );
};

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const createTask = () => {
        todolistsAPI.createTask(todolistId, title).then((res) => {
            setState(res.data);
        });
    };

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input
                    placeholder="todolistId"
                    value={todolistId}
                    onChange={(e) => {
                        setTodolistId(e.currentTarget.value);
                    }}
                />
                <input
                    placeholder="title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.currentTarget.value);
                    }}
                />
                <button onClick={createTask}>delete task</button>
            </div>
        </div>
    );
};

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');

    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
            setState(res.data);
        });
    };

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input
                    placeholder="todolistId"
                    value={todolistId}
                    onChange={(e) => {
                        setTodolistId(e.currentTarget.value);
                    }}
                />
                <input
                    placeholder="taskId"
                    value={taskId}
                    onChange={(e) => {
                        setTaskId(e.currentTarget.value);
                    }}
                />
                <button onClick={deleteTask}>delete task</button>
            </div>
        </div>
    );
};

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('description 1');
    const [status, setStatus] = useState<number>(0);
    const [priority, setPriority] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>('');
    const [deadline, setDeadline] = useState<string>('');

    const updateTaskTitle = () => {
        todolistsAPI
            .updateTask(todolistId, taskId, {
                deadline: '',
                description: description,
                priority: priority,
                startDate: '',
                status: status,
                title: title,
            })
            .then((res) => {
                setState(res.data);
            });
    };

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input
                    placeholder="todolistId"
                    value={todolistId}
                    onChange={(e) => {
                        setTodolistId(e.currentTarget.value);
                    }}
                />
                <input
                    placeholder="taskId"
                    value={taskId}
                    onChange={(e) => {
                        setTaskId(e.currentTarget.value);
                    }}
                />
                <input
                    placeholder="title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.currentTarget.value);
                    }}
                />
                <input
                    placeholder="description"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.currentTarget.value);
                    }}
                />
                <input
                    placeholder="status"
                    value={status}
                    type="number"
                    onChange={(e) => {
                        setStatus(+e.currentTarget.value);
                    }}
                />
                <input
                    placeholder="priority"
                    value={priority}
                    type="number"
                    onChange={(e) => {
                        setPriority(+e.currentTarget.value);
                    }}
                />
                <input
                    placeholder="startDate"
                    value={startDate}
                    onChange={(e) => {
                        setStartDate(e.currentTarget.value);
                    }}
                />
                <input
                    placeholder="deadline"
                    value={deadline}
                    onChange={(e) => {
                        setDeadline(e.currentTarget.value);
                    }}
                />
                <button onClick={updateTaskTitle}>delete task</button>
            </div>
        </div>
    );
};
