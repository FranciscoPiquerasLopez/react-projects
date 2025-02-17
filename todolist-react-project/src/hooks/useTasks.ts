import { useState } from "react";
import { TaskInterface } from "../interfaces/TaskInterface";

export default function useTasks(): [
    TaskInterface[],
    TaskInterface[],
    (newTask: TaskInterface) => void,
    (categorySelected: string) => void,
    (task: TaskInterface) => void,
    (task: TaskInterface, index: number) => void
] {
    const [tasks, setTasks] = useState<TaskInterface[]>([]);
    const [tasksFiltrated, setTasksFiltrated] = useState<TaskInterface[]>([]);

    const handleAddTask = (newTask: TaskInterface) => {
        setTasks([...tasks, newTask]);
    }

    const handleFilter = (categorySelected: string) => {
        const filter = tasks.filter(task => task.category === categorySelected);
        setTasksFiltrated(filter);
    }

    const deleteTask = (task: TaskInterface) => {
        tasks.forEach((taskValue, index) => {
            if (taskValue.title === task.title && taskValue.category === task.category) {
                const copyTasks = [...tasks];
                copyTasks.splice(index, 1);
                setTasks(copyTasks);
            }
        });
    }

    const editTask = (task: TaskInterface, index: number) => {
        const copyTasks = [...tasks];
        copyTasks.splice(index, 1, task);
        setTasks(copyTasks);
    }

    return [tasks, tasksFiltrated, handleAddTask, handleFilter, deleteTask, editTask];
}