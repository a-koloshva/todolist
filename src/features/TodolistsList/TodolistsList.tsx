import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppRootStateType, useAppDispatch } from '../../app/store';
import {
    FilterValuesType,
    TodolistDomainType,
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    removeTodolistTC,
} from './todolists-reducer';
import { TasksStateType, addTaskTC, removeTaskTC, updateTaskTC } from './tasks-reducer';
import { TaskStatuses } from '../../api/todolist-api';
import { AddItemForm } from '../../components/AddItemForm/AddItemForm';
import { Grid, Paper } from '@mui/material';
import { Todolist } from './Todolist/Todolist';

export const TodolistsList: React.FC = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
        (state) => state.todolists,
    );
    const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const thunk = fetchTodolistsTC();
        dispatch(thunk);
    }, []);

    const removeTask = useCallback(function (id: string, todolistId: string) {
        const thunk = removeTaskTC(id, todolistId);
        dispatch(thunk);
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        const thunk = addTaskTC(title, todolistId);
        dispatch(thunk);
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);

    const changeStatus = useCallback(function (
        id: string,
        status: TaskStatuses,
        todolistId: string,
    ) {
        const thunk = updateTaskTC(id, { status }, todolistId);
        dispatch(thunk);
    }, []);

    const changeTaskTitle = useCallback(function (
        id: string,
        newTitle: string,
        todolistId: string,
    ) {
        const thunk = updateTaskTC(id, { title: newTitle }, todolistId);
        dispatch(thunk);
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        const thunk = removeTodolistTC(id);
        dispatch(thunk);
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        const thunk = changeTodolistTitleTC(id, title);
        dispatch(thunk);
    }, []);

    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistTC(title);
        dispatch(thunk);
    }, []);

    return (
        <>
            <Grid container style={{ padding: '20px' }}>
                <AddItemForm addItem={addTodolist} />
            </Grid>
            <Grid container spacing={3}>
                {todolists.map((tl) => {
                    let allTodolistTasks = tasks[tl.id];

                    return (
                        <Grid key={tl.id} item>
                            <Paper style={{ padding: '10px' }}>
                                <Todolist
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={allTodolistTasks}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};
