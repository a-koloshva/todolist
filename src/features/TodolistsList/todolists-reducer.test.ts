import { RequestStatusType } from '../../app/app-reducer';
import {
    FilterValuesType,
    TodolistDomainType,
    addTodolistAC,
    changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer,
} from './todolists-reducer';
import { v1 } from 'uuid';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType>;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {
            id: todolistId1,
            title: 'What to learn',
            addedDate: '',
            order: 0,
            filter: 'all',
            entityStatus: 'idle',
        },
        {
            id: todolistId2,
            title: 'What to buy',
            addedDate: '',
            order: 0,
            filter: 'all',
            entityStatus: 'idle',
        },
    ];
});

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist';

    const endState = todolistsReducer(
        startState,
        addTodolistAC({ id: todolistId1, title: newTodolistTitle, addedDate: '', order: 0 }),
    );

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe('all');
    expect(endState[0].id).toBeDefined();
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist';

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed';

    const action = changeTodolistFilterAC(todolistId2, newFilter);
    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});

test('correct entity status of todolist should be changed', () => {
    let newStatus: RequestStatusType = 'loading';

    const action = changeTodolistEntityStatusAC(todolistId2, newStatus);
    const endState = todolistsReducer(startState, action);

    expect(endState[0].entityStatus).toBe('idle');
    expect(endState[1].entityStatus).toBe(newStatus);
});
