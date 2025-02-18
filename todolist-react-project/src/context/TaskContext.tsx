import React, { createContext, ReactNode, useContext, useState } from "react";
import { TaskInterface } from "../interfaces/TaskInterface";

// Interfaces
interface TaskContextType {
    tasks: TaskInterface[];
    tasksFiltrated: TaskInterface[];
    handleAddTask: (newTask: TaskInterface) => void;
    handleFilter: (categorySelected: string) => void;
    deleteTask: (task: TaskInterface) => void;
    editTask: (task: TaskInterface, index: number) => void;
}

interface TaskProviderProps {
    children: ReactNode;
}

// Context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Provider que provee el contexto
export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
    // States
    const [tasks, setTasks] = useState<TaskInterface[]>([]);
    const [tasksFiltrated, setTasksFiltrated] = useState<TaskInterface[]>([]);

    // Agregar nueva tarea
    const handleAddTask = (newTask: TaskInterface) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
    }

    // Aplicar filtro de select
    const handleFilter = (categorySelected: string) => {
        const filter = tasks.filter(task => task.category === categorySelected);
        setTasksFiltrated(filter);
    }

    // Eliminar tarea
    const deleteTask = (task: TaskInterface) => {
        tasks.forEach((taskValue, index) => {
            if (taskValue.title === task.title && taskValue.category === task.category) {
                const copyTasks = [...tasks];
                copyTasks.splice(index, 1);
                setTasks(copyTasks);
            }
        });
    }

    // Editar una tarea
    const editTask = (task: TaskInterface, index: number) => {
        const copyTasks = [...tasks];
        copyTasks.splice(index, 1, task);
        setTasks(copyTasks);
    }

    return (
        <TaskContext.Provider value={{ tasks, tasksFiltrated, handleAddTask, handleFilter, deleteTask, editTask }}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTaskContext = (): TaskContextType => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext ha lanzado un error');
    }
    return context;
};