import React, { useCallback } from 'react';
import { FilterValuesType } from './AppWithRedux';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { addTaskAC } from './state/tasks-reducer';
import { changeTodolistTitleAC, removeTodolistAC } from './state/todolists-reducer';
import { Task } from './Task';

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    id: string;
    title: string;
    changeFilter: (value: FilterValuesType, todolistId: string) => void;
    removeTodolist: (id: string) => void;
    filter: FilterValuesType;
};

export const Todolist = React.memo((props: PropsType) => {
    console.log('Todolist called');
    const tasks = useSelector<AppRootStateType, Array<TaskType>>((state) => state.tasks[props.id]);
    const dispatch = useDispatch();

    const addTask = useCallback(
        (title: string) => {
            dispatch(addTaskAC(title, props.id));
        },
        [props.id],
    );

    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistAC(props.id));
    }, [props.id]);

    const changeTodolistTitle = useCallback(
        (title: string) => {
            dispatch(changeTodolistTitleAC(props.id, title));
        },
        [props.id],
    );

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.id]);
    const onActiveClickHandler = useCallback(
        () => props.changeFilter('active', props.id),
        [props.id],
    );
    const onCompletedClickHandler = useCallback(
        () => props.changeFilter('completed', props.id),
        [props.id],
    );

    let allTodolistTasks = tasks;
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter((t) => t.isDone === false);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter((t) => t.isDone === true);
    }

    return (
        <div>
            <h3>
                <EditableSpan value={props.title} onChange={changeTodolistTitle} />
                <IconButton onClick={removeTodolist}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <div>
                {tasksForTodolist.map((t) => {
                    return <Task id={props.id} t={t} key={t.id} />;
                })}
            </div>
            <div>
                <Button
                    variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}>
                    All
                </Button>
                <Button
                    variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>
                    Active
                </Button>
                <Button
                    variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>
                    Completed
                </Button>
            </div>
        </div>
    );
});
