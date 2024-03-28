import React, { useCallback } from 'react';
import './App.css';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, Paper, Toolbar, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import { Menu } from '@mui/icons-material';
import {
    FilterValuesType,
    TodolistDomainType,
    addTodolistAC,
    changeTodolistFilterAC,
    removeTodolistAC,
} from './state/todolists-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { TaskType } from './api/task-api';
import { Todolist } from './Todolist';

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

export function AppWithRedux() {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
        (state) => state.todolists,
    );
    const dispatch = useDispatch();

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value));
    }, []);

    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistAC(id));
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title));
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
                        return (
                            <Grid key={tl.id} item>
                                <Paper style={{ padding: '10px' }}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        changeFilter={changeFilter}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
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
