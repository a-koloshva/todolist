import { v1 } from 'uuid';
import { TodolistType } from '../api/todolist-api';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST';
    id: string;
};
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST';
    title: string;
    todolistId: string;
};
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE';
    id: string;
    title: string;
};
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER';
    id: string;
    filter: FilterValuesType;
};

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType;

const initialState: Array<TodolistDomainType> = [
    // { id: todolistId1, title: 'What to learn', filter: 'all' },
    // { id: todolistId2, title: 'What to buy', filter: 'all' },
];

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType;
};

export const todolistsReducer = (
    state: Array<TodolistDomainType> = initialState,
    action: ActionsType,
): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter((tl) => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return [
                {
                    id: action.todolistId,
                    title: action.title,
                    filter: 'all',
                    addedDate: '',
                    order: 0,
                },
                ...state,
            ];
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map((todolist) =>
                todolist.id === action.id ? { ...todolist, title: action.title } : todolist,
            );
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map((todolist) =>
                todolist.id === action.id ? { ...todolist, filter: action.filter } : todolist,
            );
        }
        default:
            return state;
    }
};

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId };
};
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title, todolistId: v1() };
};
export const changeTodolistTitleAC = (
    todolistId: string,
    title: string,
): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId };
};
export const changeTodolistFilterAC = (
    todolistId: string,
    filter: FilterValuesType,
): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId };
};
