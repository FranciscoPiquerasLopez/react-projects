import { useState } from 'react';
import { TaskInterface } from '../interfaces/TaskInterface';
import ModalComponent from './ModalComponent';

interface NavbarTasks {
    tasks: TaskInterface[],
    addTask: (newTask: { title: string, category: string }) => void,
    select: (categorySelected: string) => void
}

export default function NavbarTasks({ tasks, addTask, select }: NavbarTasks) {

    const [open, setOpen] = useState<boolean>(false);

    const categoryArray = tasks.reduce((acc, task) => {
        if (!acc.includes(task.category)) {
            acc.push(task.category);
        }
        return acc;
    }, ["Todas"] as string[]);

    const handleSubmit = (title: string, category: string) => {
        addTask({ title, category });
    }

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        select(e.target.value);
    }

    return (
        <>
            <div className='nav-tasks'>
                <button onClick={() => setOpen(true)}>Añadir tarea</button>
                <select name="friltroTareas" id="friltroTareas" onChange={handleSelect}>
                    {
                        categoryArray.map(category => <option key={category} id={category}>{category}</option>)
                    }
                </select>
            </div>
            <ModalComponent submit={handleSubmit} open={open} setOpen={setOpen} titleProp="" categoryProp="" />
        </>
    )
}