import './App.css'
import NavbarTasks from './components/NavbarTasks'
import { TaskProvider } from './components/TaskProvider'
import TasksList from './components/TasksList'

function App() {
  return (
    <div className='parent'>
      <h1>Lista de tareas</h1>
      <main>
        <TaskProvider>
          <NavbarTasks></NavbarTasks>
          <TasksList></TasksList>
        </TaskProvider>
      </main>
    </div>
  )
}

export default App
