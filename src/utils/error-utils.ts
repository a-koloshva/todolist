import { Dispatch } from 'redux';
import { ResponseType } from '../api/todolist-api';
import {
    SetAppErrorActionType,
    SetAppStatusActionType,
    setAppErrorAC,
    setAppStatusAC,
} from '../app/app-reducer';

export const handleServerAppError = <D>(
    data: ResponseType<D>,
    dispatch: Dispatch<SetAppStatusActionType | SetAppErrorActionType>,
) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]));
    } else {
        dispatch(setAppErrorAC('Some error...'));
    }
    dispatch(setAppStatusAC('failed'));
};

export const handleServerNetworkError = (
    error: { message: string },
    dispatch: Dispatch<SetAppStatusActionType | SetAppErrorActionType>,
) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error...'));
    dispatch(setAppStatusAC('failed'));
};
