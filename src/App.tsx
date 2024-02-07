import React, { useReducer } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import {
  addTodolistAC,
  changeFilterAC,
  removeTodolistAC,
  todolistReducer,
  updateTodolistAC,
} from './reducers/todolistReducer';
import {
  addTaskAC,
  changeStatusAC,
  removeTaskAC,
  tasksReducer,
  updateTaskAC,
} from './reducers/tasksReducer';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, dispatchTodolists] = useReducer(todolistReducer, [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ]);

  let [tasks, dispatchTasks] = useReducer(tasksReducer, {
    [todolistID1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
  });

  function removeTask(taskId: string, todolistId: string) {
    // Простой метод
    // let todolistTasks = tasks[todolistId];
    // tasks[todolistId] = todolistTasks.filter((task) => task.id !== id);
    // setTasks({ ...tasks });
    //
    // Усложненный метод
    // setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter((task) => task.id !== id) });
    //
    // Метод через Reducer
    dispatchTasks(removeTaskAC(taskId, todolistId));
  }

  function addTask(title: string, todolistId: string) {
    // let task = { id: v1(), title: title, isDone: false };
    //
    // Простой метод
    // let todolistTasks = tasks[todolistId];
    // tasks[todolistId] = [task, ...todolistTasks];
    // setTasks({ ...tasks });
    //
    // Усложненный метод
    // setTasks({ ...tasks, [todolistId]: [task, ...tasks[todolistId]] });
    //
    // Метод через Reducer

    dispatchTasks(addTaskAC(title, todolistId));
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    //  Простой метод
    // let todolistTasks = tasks[todolistId];
    // let task = todolistTasks.find((task) => task.id === id);
    // if (task) {
    //   task.isDone = isDone;
    //   setTasks({ ...tasks });
    // }
    //
    // Усложненный метод
    // setTasks({...tasks,[todolistId]: tasks[todolistId].map((task) => (task.id === id ? { ...task, isDone } : task))});
    //
    // Метод через Reducer
    dispatchTasks(changeStatusAC(taskId, isDone, todolistId));
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    // Простой метод
    // let todolist = todolists.find((tl) => tl.id === todolistId);
    // if (todolist) {
    //   todolist.filter = value;
    //   setTodolists([...todolists]);
    // }
    //
    // Усложненный метод
    // setTodolists(
    //   [...todolists].map((todolist) =>
    //     todolist.id === todolistId ? { ...todolist, filter: value } : todolist,
    //   ),
    // );
    // Метод через Reducer
    dispatchTodolists(changeFilterAC(value, todolistId));
  }

  function removeTodolist(id: string) {
    // setTodolists(todolists.filter((todolist) => todolist.id !== id));
    // delete tasks[id];
    // setTasks({ ...tasks });
    dispatchTodolists(removeTodolistAC(id));
  }

  const addTodolist = (title: string) => {
    const todolistId = v1();

    // const newTodolist: TodolistsType = { id: todolistId, title, filter: 'all' };
    // setTodolists([newTodolist, ...todolists]);
    // setTasks({ ...tasks, [todolistId]: [] });

    dispatchTodolists(addTodolistAC(title, todolistId));
    dispatchTasks(addTodolistAC(title, todolistId));
  };

  const updateTask = (todolistId: string, taskId: string, title: string) => {
    // setTasks({
    //   ...tasks,
    //   [todolistId]: tasks[todolistId].map((task) =>
    //     task.id === taskId ? { ...task, title } : task,
    //   ),
    // });
    dispatchTasks(updateTaskAC(todolistId, taskId, title));
  };

  const updateTodolist = (todolistId: string, title: string) => {
    // setTodolists(
    //   todolists.map((todolist) => (todolist.id === todolistId ? { ...todolist, title } : todolist)),
    // );
    dispatchTodolists(updateTodolistAC(todolistId, title));
  };

  return (
    <div className="App">
      <AddItemForm callback={addTodolist} />

      {todolists.map((todolist) => {
        let tasksForTodolist = tasks[todolist.id];

        if (todolist.filter === 'active') {
          tasksForTodolist = tasks[todolist.id].filter((t) => t.isDone === false);
        }
        if (todolist.filter === 'completed') {
          tasksForTodolist = tasks[todolist.id].filter((t) => t.isDone === true);
        }

        return (
          <Todolist
            key={todolist.id}
            title={todolist.title}
            id={todolist.id}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={todolist.filter}
            removeTodolist={removeTodolist}
            updateTask={updateTask}
            updateTodolist={updateTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;
