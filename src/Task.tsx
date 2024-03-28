import { Checkbox, IconButton } from '@mui/material';
import React, { ChangeEvent, useCallback } from 'react';
import { EditableSpan } from './EditableSpan';
import { Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';
import { TaskStatuses, TaskType } from './api/task-api';

type TaskPropsType = {
    t: TaskType;
    id: string;
};

export const Task = (props: TaskPropsType) => {
    const dispatch = useDispatch();

    const onClickHandler = useCallback(() => {
        dispatch(removeTaskAC(props.t.id, props.id));
    }, [props.t.id, props.id]);
    const onChangeHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            dispatch(
                changeTaskStatusAC(
                    props.t.id,
                    newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
                    props.id,
                ),
            );
        },
        [props.t.id, props.id],
    );
    const onTitleChangeHandler = useCallback(
        (newValue: string) => {
            dispatch(changeTaskTitleAC(props.t.id, newValue, props.id));
        },
        [props.t.id, props.id],
    );

    return (
        <div
            key={props.t.id}
            className={props.t.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox
                checked={props.t.status === TaskStatuses.Completed}
                color="primary"
                onChange={onChangeHandler}
            />
            <EditableSpan value={props.t.title} onChange={onTitleChangeHandler} />
            <IconButton onClick={onClickHandler}>
                <Delete />
            </IconButton>
        </div>
    );
};
