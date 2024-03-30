import React, { useCallback, useEffect } from 'react';
import './App.css';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, Paper, Toolbar, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import { Menu } from '@mui/icons-material';
import {
    FilterValuesType,
    TodolistDomainType,
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    removeTodolistTC,
} from './state/todolists-reducer';
import { useAppDispatch, useAppSelector } from './state/store';
import { TaskStatuses, TaskType } from './api/todolist-api';
import { Todolist } from './Todolist';
import { addTaskTC, removeTaskTC, updateTaskTC } from './state/tasks-reducer';

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

export function AppWithRedux() {
    const todolists = useAppSelector<Array<TodolistDomainType>>((state) => state.todolists);
    const tasks = useAppSelector<TasksStateType>((state) => state.tasks);

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
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">News</Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
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
            </Container>
        </div>
    );
}
