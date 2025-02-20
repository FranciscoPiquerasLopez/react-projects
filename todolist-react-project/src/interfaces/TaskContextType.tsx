import { TaskInterface } from "./TaskInterface";

export interface TaskContextType {
    tasks: TaskInterface[];
    tasksFiltrated: TaskInterface[];
    handleAddTask: (newTask: TaskInterface) => void;
    handleFilter: (categorySelected: string) => void;
    deleteTask: (index: number) => void;
    editTask: (task: TaskInterface, index: number) => void;
    handleCheck: (index: number) => void;
}