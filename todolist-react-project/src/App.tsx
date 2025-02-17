import './App.css'
import NavbarTasks from './components/NavbarTasks'
import TasksList from './components/TasksList'
import useTasks from './hooks/useTasks'

function App() {

  const [tasks, tasksFiltrated, handleAddTask, handleFilter, deleteTask, editTask] = useTasks();

  return (
    <div className='parent'>
      <h1>Lista de tareas</h1>
      <main>
        <NavbarTasks tasks={tasks} addTask={handleAddTask} select={handleFilter}></NavbarTasks>
        <TasksList
          tasks={tasksFiltrated.length === 0 ? tasks : tasksFiltrated}
          handleDelete={deleteTask}
          editTask={editTask}>
        </TasksList>
      </main>
    </div>
  )
}

export default App
