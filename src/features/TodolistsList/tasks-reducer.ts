import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    UpdateTaskModelType,
    todolistsAPI,
} from '../../api/todolist-api';
import {
    SetErrorActionType,
    SetStatusActionType,
    setErrorAC,
    setStatusAC,
} from '../../app/app-reducer';
import { AppRootStateType } from '../../app/store';
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType,
} from './todolists-reducer';

import { Dispatch } from 'redux';

const initialState: TasksStateType = {};

export const tasksReducer = (
    state: TasksStateType = initialState,
    action: ActionsType,
): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter((t) => t.id !== action.taskId),
            };
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]],
            };
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((t) =>
                    t.id === action.taskId ? { ...t, ...action.model } : t,
                ),
            };
        case 'ADD-TODOLIST':
            return { ...state, [action.todolist.id]: [] };
        case 'REMOVE-TODOLIST':
            const copyState = { ...state };
            delete copyState[action.id];
            return copyState;
        case 'SET-TODOLISTS': {
            const copyState = { ...state };
            action.todolists.forEach((tl) => {
                copyState[tl.id] = [];
            });
            return copyState;
        }
        case 'SET-TASKS':
            return { ...state, [action.todolistId]: action.tasks };
        default:
            return state;
    }
};

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({ type: 'REMOVE-TASK', taskId, todolistId }) as const;

export const addTaskAC = (task: TaskType) => ({ type: 'ADD-TASK', task }) as const;

export const updateTaskAC = (
    taskId: string,
    model: UpdateDomainTaskModelType,
    todolistId: string,
) => ({ type: 'UPDATE-TASK', model, todolistId, taskId }) as const;

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({ type: 'SET-TASKS', tasks, todolistId }) as const;

// thunks
export const fetchTasksTC =
    (todolistId: string) => (dispatch: Dispatch<ActionsType | SetStatusActionType>) => {
        dispatch(setStatusAC('loading'));
        todolistsAPI.getTasks(todolistId).then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId));
            dispatch(setStatusAC('succeeded'));
        });
    };

export const removeTaskTC =
    (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
            dispatch(removeTaskAC(taskId, todolistId));
        });
    };

export const addTaskTC =
    (title: string, todolistId: string) =>
    (dispatch: Dispatch<ActionsType | SetErrorActionType | SetStatusActionType>) => {
        dispatch(setStatusAC('loading'));
        todolistsAPI.createTask(todolistId, title).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item));
                dispatch(setStatusAC('succeeded'));
            } else {
                if (res.data.messages.length) {
                    dispatch(setErrorAC(res.data.messages[0]));
                } else {
                    dispatch(setErrorAC('Some error...'));
                }
                dispatch(setStatusAC('failed'));
            }
        });
    };

export const updateTaskTC =
    (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todolistId].find((t) => t.id === taskId);
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state');
            return;
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel,
        };

        todolistsAPI.updateTask(todolistId, taskId, apiModel).then((res) => {
            dispatch(updateTaskAC(taskId, domainModel, todolistId));
        });
    };

// types
export type UpdateDomainTaskModelType = {
    title?: string;
    description?: string;
    status?: TaskStatuses;
    priority?: TaskPriorities;
    startDate?: string;
    deadline?: string;
};

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>;
