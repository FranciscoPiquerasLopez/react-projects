import { useTaskContext } from "../context/taskContext";
import Tasks from "./Tasks"

export default function TasksList() {

    const { tasks, deleteTask, editTask } = useTaskContext();
    
    return (
        <div className="container-tasks">
            {
                tasks.map((task, index) => {
                    return (
                        <Tasks key={index} index={index} title={task.title} category={task.category} handleDelete={deleteTask} handleEdit={editTask} />
                    )
                })
            }
        </div>
    )
}