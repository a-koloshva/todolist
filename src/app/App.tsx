import React from 'react';
import './App.css';
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import { Menu } from '@mui/icons-material';

import { TodolistsList } from '../features/TodolistsList/TodolistsList';

export function App() {
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
                <TodolistsList />
            </Container>
        </div>
    );
}
