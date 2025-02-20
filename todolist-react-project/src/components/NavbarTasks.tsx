import { useTaskContext } from '../hooks/useTaskContext';
import ModalComponent from './ModalComponent';
import { useState } from 'react';

export default function NavbarTasks() {

    // Custom hooks
    const { tasks, handleFilter } = useTaskContext();

    // States
    const [open, setOpen] = useState<boolean>(false);

    const categoryArray = tasks.reduce((acc, task) => {
        if (!acc.includes(task.category)) {
            acc.push(task.category);
        }
        return acc;
    }, ["Todas"] as string[]);

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        handleFilter(e.target.value);
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
            <ModalComponent
                modalType='addTask'
                open={open}
                setOpen={setOpen}
                titleProp=""
                categoryProp="" />
        </>
    )
}