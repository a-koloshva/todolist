import axios, { AxiosResponse } from 'axios';

type TaskType = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    status: number;
    priority: number;
    startDate: string;
    deadline: string;
    todolistId: string;
    order: number;
    addedData: string;
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
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': 'ec9a31ab-0261-45e0-a8af-abe1a8f842a1',
    },
});

//Возможно Promise<AxiosResponse<TaskType[]>> вещь опережающая занятия, но пока оставлю только в одном примере.

export const taskAPI = {
    getTasks(todolistId: string): Promise<AxiosResponse<TaskType[]>> {
        return instance.get<TaskType[]>(`${todolistId}/tasks`);
    },

    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`${todolistId}/tasks`, { title });
    },

    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType>(`${todolistId}/tasks/${taskId}`, { title });
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`${todolistId}/tasks/${taskId}`);
    },
};
