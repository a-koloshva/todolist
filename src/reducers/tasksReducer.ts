import { v1 } from 'uuid';
import { TasksStateType } from '../App';
import { TaskType } from '../Todolist';
import { AddTodolistACType } from './todolistReducer';

export const tasksReducer = (state: TasksStateType, action: TasksReducerType): TasksStateType => {
  switch (action.type) {
    case 'ADD-TASK': {
      let newTask: TaskType = { id: v1(), title: action.payload.title, isDone: false };
      return {
        ...state,
        [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]],
      };
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.payload.todolistId]: [],
      }; // Уточнить на поддержке, проверка на пустой массив
    }
    case 'REMOVE-TASK': {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          (task) => task.id !== action.payload.taskId,
        ),
      };
    }
    case 'CHANGE-STATUS': {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((task) =>
          task.id === action.payload.taskId ? { ...task, isDone: action.payload.isDone } : task,
        ),
      };
    }
    case 'UPDATE-TASK': {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((task) =>
          task.id === action.payload.taskId ? { ...task, title: action.payload.title } : task,
        ),
      };
    }
    default: {
      return state;
    }
  }
};

type TasksReducerType =
  | AddTaskACType
  | RemoveTodolistACType
  | ChangeStatusACType
  | UpdateStatusACType
  | AddTodolistACType;

type AddTaskACType = ReturnType<typeof addTaskAC>;

export const addTaskAC = (title: string, todolistId: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      title,
      todolistId,
    },
  } as const;
};

type RemoveTodolistACType = ReturnType<typeof removeTaskAC>;

export const removeTaskAC = (taskId: string, todolistId: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      taskId,
      todolistId,
    },
  } as const;
};

type ChangeStatusACType = ReturnType<typeof changeStatusAC>;

export const changeStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
  return {
    type: 'CHANGE-STATUS',
    payload: {
      taskId,
      isDone,
      todolistId,
    },
  } as const;
};

type UpdateStatusACType = ReturnType<typeof updateTaskAC>;

export const updateTaskAC = (todolistId: string, taskId: string, title: string) => {
  return {
    type: 'UPDATE-TASK',
    payload: {
      todolistId,
      taskId,
      title,
    },
  } as const;
};
