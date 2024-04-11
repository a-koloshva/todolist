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
        dispatch(fetchTodolistsTC());
    }, []);

    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTaskTC(id, todolistId));
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC(title, todolistId));
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(todolistId, value));
    }, []);

    const changeStatus = useCallback(function (
        id: string,
        status: TaskStatuses,
        todolistId: string,
    ) {
        dispatch(updateTaskTC(id, { status }, todolistId));
    }, []);

    const changeTaskTitle = useCallback(function (
        id: string,
        newTitle: string,
        todolistId: string,
    ) {
        dispatch(updateTaskTC(id, { title: newTitle }, todolistId));
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(removeTodolistTC(id));
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(changeTodolistTitleTC(id, title));
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
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
                                    todolist={tl}
                                    tasks={allTodolistTasks}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
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
