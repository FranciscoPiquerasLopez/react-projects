import './App.css'
import Tasks from './components/tasks'

function App() {
  return (
    <div className='parent'>
      <h1>Lista de tareas</h1>
      <main>
        <div className='nav-tasks'>
          <button>Añadir tarea</button>
          <select name="friltroTareas" id="friltroTareas">
            <option value="todas">Todas</option>
            <option value="primera">Categoría 1</option>
            <option value="segunda">Categoría 2</option>
          </select>
        </div>
        <div className="container-tasks">
          <Tasks title={'Create a react project'}></Tasks>
          <Tasks title={'Create a react project'}></Tasks>
        </div>
      </main>
    </div>
  )
}

export default App
