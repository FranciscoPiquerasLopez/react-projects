interface TasksProps {
    title: string;
}

export default function Tasks({ title }: TasksProps) {
    return (
        <div className="task">
            <div className="show-task">
                <label>
                    <input type="checkbox" name="checkbox-task" id="checkbox-task" />
                    {title}
                </label>
            </div>
            <div className="options-task">
                <button><img width={15} src="src/assets/rubbish-bin.svg" alt="Icono de eliminar" /></button>
                <button><img width={15} src="src/assets/pencil.svg" alt="Icono de editar" /></button>
            </div>
        </div>
    )
}