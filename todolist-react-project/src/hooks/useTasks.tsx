import { useState } from "react";
import { TaskInterface } from "../interfaces/TaskInterface";

export default function useTasks() {
    
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

    return { tasks, tasksFiltrated, handleAddTask, handleFilter, deleteTask, editTask };
}