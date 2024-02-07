import { FilterValuesType, TodolistsType } from '../App';

export const todolistReducer = (
  state: TodolistsType[],
  action: TodolistReducerType,
): TodolistsType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter((todolist) => todolist.id !== action.payload.todolistId);
    }
    case 'ADD-TODOLIST': {
      let newTodolist: TodolistsType = {
        id: action.payload.todolistId,
        title: action.payload.title,
        filter: 'all',
      };
      return [newTodolist, ...state]; // Уточнить на поддержке, проверка на пустой массив
    }
    case 'UPDATE-TODOLIST': {
      return state.map((todolist) =>
        todolist.id === action.payload.todolistId
          ? { ...todolist, title: action.payload.title }
          : todolist,
      );
    }
    case 'CHANGE-FILTER': {
      return [...state].map((todolist) =>
        todolist.id === action.payload.todolistId
          ? { ...todolist, filter: action.payload.value }
          : todolist,
      );
    }
    default: {
      return state;
    }
  }
};

type TodolistReducerType =
  | RemoveTodolistACType
  | AddTodolistACType
  | UploadTodolistACType
  | ChangeFilterACType;

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>;

export const removeTodolistAC = (todolistId: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {
      todolistId,
    },
  } as const;
};

export type AddTodolistACType = ReturnType<typeof addTodolistAC>;

export const addTodolistAC = (title: string, todolistId: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      title,
      todolistId,
    },
  } as const;
};

type UploadTodolistACType = ReturnType<typeof updateTodolistAC>;

export const updateTodolistAC = (todolistId: string, title: string) => {
  return {
    type: 'UPDATE-TODOLIST',
    payload: {
      todolistId,
      title,
    },
  } as const;
};

type ChangeFilterACType = ReturnType<typeof changeFilterAC>;

export const changeFilterAC = (value: FilterValuesType, todolistId: string) => {
  return {
    type: 'CHANGE-FILTER',
    payload: {
      value,
      todolistId,
    },
  } as const;
};
