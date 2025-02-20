import { useTaskContext } from "../hooks/useTaskContext";
import Tasks from "./Tasks"

export default function TasksList() {

    const { tasks, tasksFiltrated, deleteTask, handleCheck } = useTaskContext();

    const tasksList = tasksFiltrated.length === 0 ? tasks : tasksFiltrated;

    return (
        <div className="container-tasks">
            {
                tasksList.map((task, index) => {
                    return (
                        <Tasks
                            key={task.title}
                            index={index}
                            title={task.title}
                            category={task.category}
                            check={task.check}
                            handleDelete={deleteTask}
                            handleCheck={handleCheck} />
                    );
                })
            }
        </div>
    )
}