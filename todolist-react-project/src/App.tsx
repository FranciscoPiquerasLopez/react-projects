import './App.css'
import NavbarTasks from './components/NavbarTasks'
import TasksList from './components/TasksList'

function App() {

  const tasks = [
    {
      title: 'Create a react project',
      category: 'all'
    },
    {
      title: 'Create another react project',
      category: 'task'
    }
  ];

  const categoryArray = tasks.reduce((acc, task) => {
    if (!acc.includes(task.category)) {
      acc.push(task.category);
    }
    return acc;
  }, [] as string[]);

  return (
    <div className='parent'>
      <h1>Lista de tareas</h1>
      <main>
        <NavbarTasks categories={categoryArray} />
        <TasksList tasks={tasks} />
      </main>
    </div>
  )
}

export default App
