import React, { useEffect, useState } from 'react';
import { todolistAPI } from '../api/todolist-api';

export default {
    title: 'API',
};

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistAPI.getTodolists().then((res) => {
            setState(res.data);
        });
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistAPI.createTodolist('SuperTodolist').then((res) => setState(res.data));
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = '01b28dc2-ca61-426b-8be7-8323eb142d40';
    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId).then((res) => setState(res.data));
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = 'fef55e8e-cc20-407b-9d83-b5c6e58db274';
        todolistAPI.updateTodolist(todolistId, 'TODOLIST-1').then((res) => {
            setState(res.data);
        });
    }, []);

    return <div> {JSON.stringify(state)}</div>;
};
