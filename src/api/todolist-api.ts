import axios from 'axios';

export type TodolistType = {
    id: string;
    addedDate: string;
    order: number;
    title: string;
};

type ResponseType<D = {}> = {
    resultCode: number;
    messages: string[];
    fieldsErrors: FieldErrorType[];
    data: D;
};

type FieldErrorType = {
    error: string;
    field: string;
};

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'ec9a31ab-0261-45e0-a8af-abe1a8f842a1',
    },
});

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title });
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', { title });
    },

    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists');
    },
};
