import { useContext } from "react";
import { TaskContextType } from "../interfaces/TaskContextType";
import { TaskContext } from "../context/TaskContext";

export const useTaskContext = (): TaskContextType => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext ha lanzado un error');
    }
    return context;
};