import { TodolistType, todolistsAPI } from '../api/todolist-api';
import { Dispatch } from 'redux';

const initialState: TodolistDomainType[] = [];

export const todolistsReducer = (
    state: Array<TodolistDomainType> = initialState,
    action: ActionsType,
): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter((tl) => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return [{ ...action.todolist, filter: 'all' }, ...state];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map((tl) => (tl.id === action.id ? { ...tl, title: action.title } : tl));
        case 'CHANGE-TODOLIST-FILTER':
            return state.map((tl) => (tl.id === action.id ? { ...tl, filter: action.filter } : tl));
        case 'SET-TODOLISTS':
            return action.todolists.map((tl) => ({ ...tl, filter: 'all' }));
        default:
            return state;
    }
};

//----- Actions -----

export const removeTodolistAC = (id: string) => ({ type: 'REMOVE-TODOLIST', id }) as const;

export const addTodolistAC = (todolist: TodolistType) =>
    ({ type: 'ADD-TODOLIST', todolist }) as const;

export const changeTodolistTitleAC = (id: string, title: string) =>
    ({ type: 'CHANGE-TODOLIST-TITLE', title: title, id }) as const;

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({ type: 'CHANGE-TODOLIST-FILTER', filter: filter, id }) as const;

export const setTodolistsAC = (todolists: Array<TodolistType>) =>
    ({ type: 'SET-TODOLISTS', todolists }) as const;

//----- Thunks -----

export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionsType>) =>
    todolistsAPI.getTodolists().then((res) => dispatch(setTodolistsAC(res.data)));

export const removeTodolistTC = (id: string) => (dispatch: Dispatch<ActionsType>) =>
    todolistsAPI.deleteTodolist(id).then((res) => dispatch(removeTodolistAC(id)));

export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) =>
    todolistsAPI.createTodolist(title).then((res) => dispatch(addTodolistAC(res.data.data.item)));

export const changeTodolistTitleTC =
    (id: string, title: string) => (dispatch: Dispatch<ActionsType>) =>
        todolistsAPI
            .updateTodolist(id, title)
            .then((res) => dispatch(changeTodolistTitleAC(id, title)));

//----- Types -----

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType;
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType;
};
