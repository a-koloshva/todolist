import React from 'react';

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: TaskType[];
};

export const Todolist = (props: PropsType) => {
  return (
    <div className="todoList">
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map((task) => {
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} /> <span>{task.title}</span>
            </li>
          );
        })}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};