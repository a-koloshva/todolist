import React, { ChangeEvent } from 'react';
import { FilterValuesType } from './App';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import { EditableSpan } from './components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  id: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValuesType;
  removeTodolist: (id: string) => void;
  updateTask: (todolistId: string, taskId: string, title: string) => void;
  updateTodolist: (todolistId: string, title: string) => void;
};

export function Todolist(props: PropsType) {
  const onAllClickHandler = () => props.changeFilter('all', props.id);
  const onActiveClickHandler = () => props.changeFilter('active', props.id);
  const onCompletedClickHandler = () => props.changeFilter('completed', props.id);

  const removeTodolistHandler = () => props.removeTodolist(props.id);

  const addTaskHandler = (title: string) => {
    props.addTask(title, props.id);
  };

  const updateTodolistHandler = (title: string) => {
    props.updateTodolist(props.id, title);
  };

  return (
    <div>
      <h3>
        <EditableSpan oldTitle={props.title} callback={updateTodolistHandler} />
        {/* <button onClick={removeTodolistHandler}>x</button> */}
        <IconButton onClick={removeTodolistHandler}>
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm callback={addTaskHandler} />
      <ul>
        {props.tasks &&
          props.tasks.map((t) => {
            const onClickHandler = () => props.removeTask(t.id, props.id);
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
            };

            const updateTaskHandler = (title: string) => {
              props.updateTask(props.id, t.id, title);
            };

            return (
              <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                {/* <input type="checkbox" onChange={onChangeHandler} checked={t.isDone} /> */}
                <Checkbox onChange={onChangeHandler} checked={t.isDone} color="primary" />
                {/* <span>{t.title}</span> */}
                <EditableSpan oldTitle={t.title} callback={updateTaskHandler} />
                {/* <button onClick={onClickHandler}>x</button> */}
                <IconButton onClick={onClickHandler}>
                  <DeleteIcon />
                </IconButton>
              </li>
            );
          })}
      </ul>
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
}
