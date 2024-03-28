import axios from 'axios';

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export type TaskType = {
    id: string;
    title: string;
    description: string;
    status: TaskStatuses;
    priority: TaskPriorities;
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

export type UpdateTaskType = {
    title: string;
    description: string;
    status: number;
    priority: number;
    startDate: string;
    deadline: string;
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
    getTasks(todolistId: string) {
        return instance.get<TaskType[]>(`${todolistId}/tasks`);
    },

    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`${todolistId}/tasks`, { title });
    },

    updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<ResponseType>(`${todolistId}/tasks/${taskId}`, { model });
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`${todolistId}/tasks/${taskId}`);
    },
};
