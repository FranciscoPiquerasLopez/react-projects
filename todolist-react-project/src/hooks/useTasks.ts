import { useState } from "react";
import { TaskInterface } from "../interfaces/TaskInterface";

export default function useTasks(): [
    TaskInterface[],
    (newTask: { title: string, category: string }) => void
] {
    const [tasks, setTasks] = useState<TaskInterface[]>([]);

    const handleAddTask = (newTask: { title: string, category: string }) => {
        setTasks([...tasks, newTask]);
    }

    //const handleFilter = (categorySelected: string) => {
        //const filter = tasks.filter(task => task.category === categorySelected);
        //setTasksFiltrated(filter);
    //}

    return [tasks, handleAddTask];
}