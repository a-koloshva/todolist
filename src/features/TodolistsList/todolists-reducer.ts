import { TodolistType, todolistsAPI } from '../../api/todolist-api';
import { Dispatch } from 'redux';
import { RequestStatusType, SetAppStatusActionType, setAppStatusAC } from '../../app/app-reducer';

const initialState: TodolistDomainType[] = [];

export const todolistsReducer = (
    state: Array<TodolistDomainType> = initialState,
    action: ActionsType,
): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter((tl) => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return [{ ...action.todolist, filter: 'all', entityStatus: 'idle' }, ...state];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map((tl) => (tl.id === action.id ? { ...tl, title: action.title } : tl));
        case 'CHANGE-TODOLIST-FILTER':
            return state.map((tl) => (tl.id === action.id ? { ...tl, filter: action.filter } : tl));
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map((tl) =>
                tl.id === action.id ? { ...tl, entityStatus: action.status } : tl,
            );
        case 'SET-TODOLISTS':
            return action.todolists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }));
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

export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) =>
    ({ type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status }) as const;

export const setTodolistsAC = (todolists: Array<TodolistType>) =>
    ({ type: 'SET-TODOLISTS', todolists }) as const;

//----- Thunks -----

export const fetchTodolistsTC = () => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'));
        todolistsAPI.getTodolists().then((res) => {
            dispatch(setTodolistsAC(res.data));
            dispatch(setAppStatusAC('succeeded'));
        });
    };
};

export const removeTodolistTC = (id: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'));
        dispatch(changeTodolistEntityStatusAC(id, 'loading'));
        todolistsAPI.deleteTodolist(id).then((res) => {
            dispatch(removeTodolistAC(id));
            dispatch(setAppStatusAC('succeeded'));
        });
    };
};

export const addTodolistTC = (title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'));
    todolistsAPI.createTodolist(title).then((res) => {
        dispatch(addTodolistAC(res.data.data.item));
        dispatch(setAppStatusAC('succeeded'));
    });
};

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
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | SetTodolistsActionType;
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType;
    entityStatus: RequestStatusType;
};
type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType>;
