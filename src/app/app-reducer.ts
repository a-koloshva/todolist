import { Dispatch } from 'redux';
import { authAPI } from '../api/todolist-api';
import { setIsLoggedInAC } from '../features/Login/auth-reducer';
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils';

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
};

export const appReducer = (
    state: InitialStateType = initialState,
    action: ActionsType,
): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status };
        case 'APP/SET-ERROR':
            return { ...state, error: action.error };
        case 'APP/SET-IS-INITIALIZED':
            return { ...state, isInitialized: action.isInitialized };
        default:
            return state;
    }
};

// Actions

export const setAppErrorAC = (error: string | null) =>
    ({
        type: 'APP/SET-ERROR',
        error,
    }) as const;

export const setAppStatusAC = (status: RequestStatusType) =>
    ({
        type: 'APP/SET-STATUS',
        status,
    }) as const;

export const setIsInitializedAC = (isInitialized: boolean) =>
    ({ type: 'APP/SET-IS-INITIALIZED', isInitialized }) as const;

// Thunk

export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    authAPI
        .me()
        .then((res) => {
            debugger;
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true));
        });
};

// Types

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type InitialStateType = {
    status: RequestStatusType;
    error: string | null;
    isInitialized: boolean;
};

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type setIsInitializedACType = ReturnType<typeof setIsInitializedAC>;

type ActionsType = SetAppErrorActionType | SetAppStatusActionType | setIsInitializedACType;
