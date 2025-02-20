import { ReactNode, useEffect, useReducer, useState } from "react";
import { taskReducer } from "../reducers/taskReducer";
import { TaskInterface } from "../interfaces/TaskInterface";
import { ActionType } from "../constants/action.enum";
import { TaskContext } from "../context/TaskContext";

interface TaskProviderProps {
    children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
    
    // LocalStorage para recuperar por primera vez las tareas iniciales
    const initialTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    // Reducer
    const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

    // State
    const [tasksFiltrated, setTasksFiltrated] = useState<TaskInterface[]>([]);
    const [categorySelected, setCategorySelected] = useState<string>("");

    // useEffect cada vez que las tasks cambien para el localStorage y refrescar también el tasksFiltrated
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        handleFilter(categorySelected);
    }, [tasks]);

    // Agregar nueva tarea
    const handleAddTask = (newTask: TaskInterface) => {
        dispatch({ type: ActionType.ADD, task: newTask });
    }

    // Aplicar filtro de select
    const handleFilter = (categorySelected: string) => {
        const filter = tasks.filter(task => task.category === categorySelected);
        setTasksFiltrated(filter);
        setCategorySelected(categorySelected);
    }

    // Eliminar tarea
    const deleteTask = (index: number) => {
        dispatch({ type: ActionType.DELETE, index });
    }

    // Editar una tarea
    const editTask = (task: TaskInterface, index: number) => {
        dispatch({ type: ActionType.EDIT, task: task, index });
    }

    const handleCheck = (index: number) => {
        dispatch({ type: ActionType.CHECK, index });
    }

    return (
        <TaskContext.Provider value={{ tasks, tasksFiltrated, handleAddTask, handleFilter, deleteTask, editTask, handleCheck }}>
            {children}
        </TaskContext.Provider>
    );
}