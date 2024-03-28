import { v1 } from 'uuid';
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer';
import { TaskPriorities, TaskStatuses, TaskType } from '../api/task-api';
import { TasksStateType } from '../AppWithRedux';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK';
    todolistId: string;
    taskId: string;
};
export type AddTaskActionType = {
    type: 'ADD-TASK';
    title: string;
    todolistId: string;
};
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS';
    taskId: string;
    todolistId: string;
    status: TaskStatuses;
};
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE';
    taskId: string;
    todolistId: string;
    title: string;
};

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType;

export const todolistId1 = v1();
export const todolistId2 = v1();

const initialState: TasksStateType = {
    // [todolistId1]: [
    //     { id: v1(), title: 'HTML&CSS', isDone: true },
    //     { id: v1(), title: 'JS', isDone: true },
    // ],
    // [todolistId2]: [
    //     { id: v1(), title: 'Milk', isDone: true },
    //     { id: v1(), title: 'React Book', isDone: true },
    // ],
};

export const tasksReducer = (
    state: TasksStateType = initialState,
    action: ActionsType,
): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(
                    (task) => task.id !== action.taskId,
                ),
            };
        }
        case 'ADD-TASK': {
            const newTask: TaskType = {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                todolistId: todolistId2,
                startDate: '',
                deadline: '',
                addedData: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            };
            return { ...state, [action.todolistId]: [newTask, ...state[action.todolistId]] };
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((task) =>
                    task.id === action.taskId ? { ...task, status: action.status } : task,
                ),
            };
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((task) =>
                    task.id === action.taskId ? { ...task, title: action.title } : task,
                ),
            };
        }
        case 'ADD-TODOLIST': {
            return { ...state, [action.todolistId]: [] };
        }
        case 'REMOVE-TODOLIST': {
            const copyState = { ...state };
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
};

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', todolistId, taskId };
};
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title, todolistId };
};
export const changeTaskStatusAC = (
    taskId: string,
    status: TaskStatuses,
    todolistId: string,
): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', status, todolistId, taskId };
};
export const changeTaskTitleAC = (
    taskId: string,
    title: string,
    todolistId: string,
): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', title, todolistId, taskId };
};
