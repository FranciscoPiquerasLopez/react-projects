import './App.css'
import NavbarTasks from './components/NavbarTasks'
import TasksList from './components/TasksList'
import useTasks from './hooks/useTasks'

function App() {

  const [tasks, handleAddTask] = useTasks();

  return (
    <div className='parent'>
      <h1>Lista de tareas</h1>
      <main>
        <NavbarTasks tasks={tasks} addTask={handleAddTask}></NavbarTasks>
        <TasksList tasks={tasks}></TasksList>
      </main>
    </div>
  )
}

export default App
