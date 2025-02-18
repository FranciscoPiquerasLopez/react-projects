import './App.css'
import NavbarTasks from './components/NavbarTasks'
import TasksList from './components/TasksList'
import { TaskProvider } from './context/taskContext';

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
