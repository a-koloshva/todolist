import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  addTask: (title: string) => void;
  removeTask: (taskId: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  changeStatus: (taskId: string, isDone: boolean) => void;
  filter: FilterValuesType;
};

export function Todolist(props: PropsType) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addTask = () => {
    if (title.trim() !== '') {
      props.addTask(title.trim());
      setTitle('');
    } else {
      setError('Title is required');
    }
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === 'Enter') {
      addTask();
    }
  };

  const onAllClickHandler = () => {
    props.changeFilter('all');
  };
  const onActiveClickHandler = () => {
    props.changeFilter('active');
  };
  const onCompletedClickHandler = () => {
    props.changeFilter('completed');
  };

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          className={error ? 'error' : ''}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map((task) => {
          const onClickHandler = () => props.removeTask(task.id);
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(task.id, e.currentTarget.checked);
          };
          return (
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
              <input type="checkbox" onChange={onChangeHandler} checked={task.isDone} />
              <span>{task.title}</span>
              <button onClick={onClickHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === 'all' ? 'active-filter' : ''}
          onClick={onAllClickHandler}>
          All
        </button>
        <button
          className={props.filter === 'active' ? 'active-filter' : ''}
          onClick={onActiveClickHandler}>
          Active
        </button>
        <button
          className={props.filter === 'completed' ? 'active-filter' : ''}
          onClick={onCompletedClickHandler}>
          Completed
        </button>
      </div>
    </div>
  );
}
