import { TaskInterface } from "../interfaces/TaskInterface";


export default function Tasks({ title, category }: TaskInterface) {
    return (
        <div className="container-tasks">
            <div className="task">
                <div className="show-task">
                    <label>
                        <input type="checkbox" name="checkbox-task" id="checkbox-task" />
                        {title}
                    </label>
                    <span>Categoría: {category}</span>
                </div>
                <div className="options-task">
                    <button><img width={15} src="src/assets/rubbish-bin.svg" alt="Icono de eliminar" /></button>
                    <button><img width={15} src="src/assets/pencil.svg" alt="Icono de editar" /></button>
                </div>
            </div>
        </div >
    )
}