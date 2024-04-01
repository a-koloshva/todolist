import {
    TasksStateType,
    addTaskAC,
    removeTaskAC,
    tasksReducer,
    updateTaskAC,
} from './tasks-reducer';
import { addTodolistAC, removeTodolistAC } from './todolists-reducer';
import { TaskPriorities, TaskStatuses } from '../../api/todolist-api';

let startState: TasksStateType;

beforeEach(() => {
    startState = {
        todolistId1: [
            {
                id: '1',
                title: 'HTML&CSS',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
        ],
        todolistId2: [
            {
                id: '1',
                title: 'Milk',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
            {
                id: '2',
                title: 'Water',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
            {
                id: '3',
                title: 'Beer',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
        ],
    };
});

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('2', 'todolistId2');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'].every((t) => t.id !== '2')).toBeTruthy();
    expect(endState['todolistId2'][0].id).toBe('1');
    expect(endState['todolistId2'][1].id).toBe('3');
});

test('correct task should be added to correct array', () => {
    // const action = addTaskAC('juce', 'todolistId2');

    const action = addTaskAC({
        todoListId: 'todolistId2',
        title: 'juce',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: 0,
        startDate: '',
        id: 'id existed',
    });

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juce');
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
});

test('status of specified task should be changed', () => {
    const action = updateTaskAC('2', { status: TaskStatuses.Completed }, 'todolistId2');

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed);
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {
    const action = updateTaskAC('2', { title: 'Milkyway' }, 'todolistId2');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId2'][1].title).toBe('Milkyway');
    expect(endState['todolistId1'][1].title).toBe('JS');
});

test('new property with new array should be added when new todolist is added', () => {
    const action = addTodolistAC({
        id: '3',
        title: 'title no matter',
        order: 0,
        addedDate: '',
    });
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find((k) => k !== 'todolistId1' && k !== 'todolistId2');
    if (!newKey) {
        throw Error('new key should be added');
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toStrictEqual([]);
});

test('propertry with todolistId should be deleted', () => {
    const action = removeTodolistAC('todolistId2');

    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined();
});
