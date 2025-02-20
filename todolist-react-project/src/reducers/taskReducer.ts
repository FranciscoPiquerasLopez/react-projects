import { ActionType } from "../constants/action.enum";
import { TaskInterface } from "../interfaces/TaskInterface";

type TaskState = TaskInterface[];

type ActionAdd = { type: ActionType.ADD, task: TaskInterface };
type ActionDelete = { type: ActionType.DELETE, index: number };
type ActionEdit = { type: ActionType.EDIT, task: TaskInterface, index: number };
type ActionCheck = { type: ActionType.CHECK, index: number };

type Action = ActionAdd | ActionDelete | ActionEdit | ActionCheck;

export const taskReducer = (tasks: TaskState, action: Action): TaskState => {
    switch (action.type) {
        case ActionType.ADD:
            return [
                ...tasks,
                action.task
            ];
        case ActionType.DELETE:
            return [...tasks].slice(0, action.index).concat([...tasks].slice(action.index + 1));
        case ActionType.EDIT:
            return [...tasks].slice(0, action.index).concat(action.task).concat([...tasks].slice(action.index + 1));
        case ActionType.CHECK:
            return tasks.map((task, i) => i === action.index ? { ...task, check: !task.check } : task);
        default:
            return tasks;
    }
}