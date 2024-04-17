import React, { useEffect } from 'react';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    LinearProgress,
    Toolbar,
    Typography,
} from '@mui/material';
import { TodolistsList } from '../features/TodolistsList/TodolistsList';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';
import { useSelector } from 'react-redux';
import { AppRootStateType, useAppDispatch } from './store';
import { RequestStatusType, initializeAppTC } from './app-reducer';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../features/Login/Login';
import { logoutTC } from '../features/Login/auth-reducer';

export function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status);
    const isInitialized = useSelector<AppRootStateType, boolean>(
        (state) => state.app.isInitialized,
    );
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeAppTC());
    }, []);

    if (!isInitialized) {
        return (
            <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
                <CircularProgress />
            </div>
        );
    }

    const logoutHandler = () => {
        dispatch(logoutTC());
    };

    return (
        <HashRouter>
            <div className="App">
                <ErrorSnackbar />
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            TodoList
                        </Typography>
                        {isLoggedIn && (
                            <Button color="inherit" onClick={logoutHandler}>
                                Logout
                            </Button>
                        )}
                    </Toolbar>
                    <div style={{ height: '5px' }}>
                        {status === 'loading' && <LinearProgress />}
                    </div>
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<TodolistsList />} />
                        <Route path={'/login'} element={<Login />} />
                        <Route
                            path={'/404'}
                            element={
                                <h2 style={{ alignItems: 'center' }}>404: Page Not Found...</h2>
                            }
                        />
                        <Route path="*" element={<Navigate to={'/404'} />} />
                    </Routes>
                </Container>
            </div>
        </HashRouter>
    );
}
