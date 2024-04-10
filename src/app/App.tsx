import React from 'react';
import './App.css';
import { AppBar, Button, Container, LinearProgress, Toolbar, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import { Menu } from '@mui/icons-material';
import { TodolistsList } from '../features/TodolistsList/TodolistsList';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './store';
import { RequestStatusType } from './app-reducer';

export function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status);
    return (
        <div className="App">
            <ErrorSnackbar />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">News</Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                <div style={{ height: '5px' }}>{status === 'loading' && <LinearProgress />}</div>
            </AppBar>
            <Container fixed>
                <TodolistsList />
            </Container>
        </div>
    );
}
