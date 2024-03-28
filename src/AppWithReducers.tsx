import React, { useReducer } from 'react';
import './App.css';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, Paper, Toolbar, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import { Menu } from '@mui/icons-material';
import {
    FilterValuesType,
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer,
} from './state/todolists-reducer';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
} from './state/tasks-reducer';
import { Todolist } from './Todolist';
import { TaskPriorities, TaskStatuses, TaskType } from './api/task-api';

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

export function AppWithReducers() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        { id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0 },
        { id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0 },
    ]);

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                todolistId: todolistId1,
                startDate: '',
                deadline: '',
                addedData: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                todolistId: todolistId1,
                startDate: '',
                deadline: '',
                addedData: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                todolistId: todolistId2,
                startDate: '',
                deadline: '',
                addedData: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                todolistId: todolistId2,
                startDate: '',
                deadline: '',
                addedData: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
        ],
    });

    function removeTask(id: string, todolistId: string) {
        // //достанем нужный массив по todolistId:
        // let todolistTasks = tasks[todolistId];
        // // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
        // tasks[todolistId] = todolistTasks.filter((t) => t.id !== id);
        // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        // setTasks({ ...tasks });

        const action = removeTaskAC(id, todolistId);
        dispatchToTasks(action);
    }

    function addTask(title: string, todolistId: string) {
        // let task = { id: v1(), title: title, isDone: false };
        // //достанем нужный массив по todolistId:
        // let todolistTasks = tasks[todolistId];
        // // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
        // tasks[todolistId] = [task, ...todolistTasks];
        // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        // setTasks({ ...tasks });

        const action = addTaskAC(title, todolistId);
        dispatchToTasks(action);
    }

    function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
        // //достанем нужный массив по todolistId:
        // let todolistTasks = tasks[todolistId];
        // // найдём нужную таску:
        // let task = todolistTasks.find((t) => t.id === id);
        // //изменим таску, если она нашлась
        // if (task) {
        //     task.isDone = isDone;
        //     // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        //     setTasks({ ...tasks });
        // }

        const action = changeTaskStatusAC(id, status, todolistId);
        dispatchToTasks(action);
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        // //достанем нужный массив по todolistId:
        // let todolistTasks = tasks[todolistId];
        // // найдём нужную таску:
        // let task = todolistTasks.find((t) => t.id === id);
        // //изменим таску, если она нашлась
        // if (task) {
        //     task.title = newTitle;
        //     // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        //     setTasks({ ...tasks });
        // }

        const action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatchToTasks(action);
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        // let todolist = todolists.find((tl) => tl.id === todolistId);
        // if (todolist) {
        //     todolist.filter = value;
        //     setTodolists([...todolists]);
        // }

        const action = changeTodolistFilterAC(todolistId, value);
        dispatchToTodolists(action);
    }

    function removeTodolist(id: string) {
        // // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        // setTodolists(todolists.filter((tl) => tl.id !== id));
        // // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        // delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        // setTasks({ ...tasks });

        const action = removeTodolistAC(id);
        dispatchToTodolists(action);
    }

    function changeTodolistTitle(id: string, title: string) {
        // // найдём нужный todolist
        // const todolist = todolists.find((tl) => tl.id === id);
        // if (todolist) {
        //     // если нашёлся - изменим ему заголовок
        //     todolist.title = title;
        //     setTodolists([...todolists]);
        // }

        const action = changeTodolistTitleAC(id, title);
        dispatchToTodolists(action);
    }

    function addTodolist(title: string) {
        // let newTodolistId = v1();
        // let newTodolist: TodolistType = { id: newTodolistId, title: title, filter: 'all' };
        // setTodolists([newTodolist, ...todolists]);
        // setTasks({
        //     ...tasks,
        //     [newTodolistId]: [],
        // });

        const action = addTodolistAC(title);
        dispatchToTasks(action);
        dispatchToTodolists(action);
    }

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
                        let tasksForTodolist = allTodolistTasks;

                        if (tl.filter === 'active') {
                            tasksForTodolist = allTodolistTasks.filter(
                                (t) => t.status === TaskStatuses.New,
                            );
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodolist = allTodolistTasks.filter(
                                (t) => t.status === TaskStatuses.Completed,
                            );
                        }

                        return (
                            <Grid key={tl.id} item>
                                <Paper style={{ padding: '10px' }}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        // tasks={tasksForTodolist}
                                        // removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        // addTask={addTask}
                                        // changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        // changeTaskTitle={changeTaskTitle}
                                        // changeTodolistTitle={changeTodolistTitle}
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
