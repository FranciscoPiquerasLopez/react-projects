import { TaskInterface } from "../interfaces/TaskInterface"
import Tasks from "./Tasks"

export default function TasksList({ tasks, handleDelete, editTask }: { tasks: TaskInterface[], handleDelete: (task: TaskInterface) => void, editTask: (task: TaskInterface, index: number) => void }) {
    return (
        <div className="container-tasks">
            {
                tasks.map((task, index) => {
                    return (
                        <Tasks key={index} index={index} title={task.title} category={task.category} handleDelete={handleDelete} handleEdit={editTask} />
                    )
                })
            }
        </div>
    )
}