import { TasksListInterface } from "../interfaces/TaskListInterface";
import Tasks from "./Tasks"

export default function TasksList({ tasks }: TasksListInterface) {
    return (
        <>
            {
                tasks.map((task, index) => {
                    return (
                        <Tasks key={index} title={task.title} category={task.category} />
                    )
                })
            }
        </>
    )
}