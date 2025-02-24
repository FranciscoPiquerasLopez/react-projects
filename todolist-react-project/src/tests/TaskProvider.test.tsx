import { describe, expect, test } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { TaskProvider } from "../components/TaskProvider";
import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { taskReducer } from '../reducers/taskReducer';
import { ActionType } from '../constants/action.enum';
import { TaskInterface } from '../interfaces/TaskInterface';

type ActionAdd = { type: ActionType.ADD, task: TaskInterface };
type ActionDelete = { type: ActionType.DELETE, index: number };
type ActionEdit = { type: ActionType.EDIT, task: TaskInterface, index: number };
type ActionCheck = { type: ActionType.CHECK, index: number };

type Action = ActionAdd | ActionDelete | ActionEdit | ActionCheck;

describe('Testing unitario del estado tasks del contexto', () => {

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TaskProvider>{children}</TaskProvider>
    );

    test('Add a new task', () => {
        const { result } = renderHook(() => useContext(TaskContext), { wrapper });

        const newTask = { title: 'Nueva tarea', category: 'Trabajo', check: false };

        // Agregar tarea
        act(() => {
            result.current?.handleAddTask(newTask);
        });

        // Comprobamos si se ha añadido la tarea
        expect(result.current?.tasks).toHaveLength(1);

        // Comprobamos si la tarea es la que es
        expect(result.current?.tasks[0].title === 'Nueva tarea');
    });

    test('Delete a task', () => {
        const { result } = renderHook(() => useContext(TaskContext), { wrapper });

        // Eliminar la tarea
        act(() => {
            result.current?.deleteTask(0);
        });

        // Comprobar la eliminación
        expect(result.current?.tasks).toHaveLength(0);
    });

    test('Edit a task', () => {
        const { result } = renderHook(() => useContext(TaskContext), { wrapper });

        const taskToEdit = {
            title: 'Nueva tarea',
            category: 'Casa',
            check: false,
        };

        // Añadir la tarea a EDITAR
        act(() => {
            result.current?.handleAddTask(taskToEdit);
        });

        // Comprobar si se ha añadido bien
        expect(result.current?.tasks).toHaveLength(1);

        // Editamos la tarea
        act(() => {
            result.current?.editTask(
                {
                    title: 'Tarea',
                    category: 'Tareas terminadas',
                    check: false,
                },
                0
            );
        });

        // Comprobar si la tarea se ha editado
        expect(result.current?.tasks[0].title === 'Tarea');
    });

    test('Check if handleCheck works well', () => {
        const { result } = renderHook(() => useContext(TaskContext), { wrapper });

        act(() => {
            result.current?.handleCheck(0);
        });

        expect(result.current?.tasks[0].check === false);
    });
});

describe('Test unitario para comprobar lógica pura sin contexto', () => {

    const initialState: TaskInterface[] = [];

    test('Add a new task without CONTEXT', () => {
        const newTask: TaskInterface = {
            title: 'Nueva tarea',
            category: 'Tareas recientes',
            check: false,
        };
        const action: Action = { type: ActionType.ADD, task: newTask };

        const newState = taskReducer(initialState, action);

        expect(newState).toHaveLength(1);
        expect(newState[0].title).toBe("Nueva tarea");
    });

    test('Edit a task without CONTEXT', () => {
        const state = [
            {
                title: 'Tarea original',
                category: 'Casa',
                check: false,
            },
        ];
        const editedTask = {
            title: 'Tarea editada',
            category: 'Casa',
            check: false,
        };
        const action: Action = {
            type: ActionType.EDIT,
            task: editedTask,
            index: 0,
        };

        const newState = taskReducer(state, action);

        expect(newState[0].title).toBe("Tarea editada");
    });

    test('Delete a task without CONTEXT', () => {
        const state = [{ title: "Tarea a eliminar", category: "Casa", check: false }];
        const action: Action = { type: ActionType.DELETE, index: 0 };
        const newState = taskReducer(state, action);

        expect(newState).toHaveLength(0);
    });

    test('Check a task without CONTEXT', () => {
        const state = [{ title: 'Tarea', category: 'Casa', check: false }];
        const action: Action = { type: ActionType.CHECK, index: 0 };
        const newState = taskReducer(state, action);

        expect(newState[0].check).toBe(true);
    });
});