import { createContext } from "react";
import { TaskContextType } from "../interfaces/TaskContextType";

// Context
export const TaskContext = createContext<TaskContextType | undefined>(undefined);