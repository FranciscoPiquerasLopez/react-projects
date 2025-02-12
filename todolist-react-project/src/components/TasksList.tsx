import { TaskInterface } from "../interfaces/TaskInterface"
import Tasks from "./Tasks"

export default function TasksList({ tasks }: { tasks: TaskInterface[] }) {
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