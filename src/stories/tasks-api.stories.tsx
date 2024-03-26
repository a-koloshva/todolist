import React, { useEffect, useState } from 'react';
import { taskAPI } from '../api/task-api';

export default {
    title: 'API',
};

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = '4613e295-9208-40c1-afc6-ed88c53d6298';
    useEffect(() => {
        taskAPI.getTasks(todolistId).then((res) => {
            setState(res.data);
        });
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = '4613e295-9208-40c1-afc6-ed88c53d6298';
    const title = 'new task3';
    useEffect(() => {
        taskAPI.createTask(todolistId, title).then((res) => {
            setState(res.data);
        });
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = 'fef55e8e-cc20-407b-9d83-b5c6e58db274';
    const taskId = '';
    useEffect(() => {
        taskAPI.deleteTask(todolistId, taskId).then((res) => {
            setState(res.data);
        });
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = 'fef55e8e-cc20-407b-9d83-b5c6e58db274';
    const taskId = '';
    const title = 'milk';
    useEffect(() => {
        taskAPI.updateTask(todolistId, taskId, title).then((res) => {
            setState(res.data);
        });
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};
