import { useState } from 'react';
import './App.css'
import NavbarTasks from './components/NavbarTasks'
import TasksList from './components/TasksList'

function App() {

  const [tasks, setTasks] = useState(
    [
      {
        title: 'Create a react project',
        category: 'all'
      }
    ]
  );

  const categoryArray = tasks.reduce((acc, task) => {
    if (!acc.includes(task.category)) {
      acc.push(task.category);
    }
    return acc;
  }, [] as string[]);

  const handleAddTask = (newTask: { title: string, category: string }) => {
    setTasks([...tasks, newTask]);
  }

  return (
    <div className='parent'>
      <h1>Lista de tareas</h1>
      <main>
        <NavbarTasks categories={categoryArray} onClick={handleAddTask} />
        <TasksList tasks={tasks} />
      </main>
    </div>
  )
}

export default App
