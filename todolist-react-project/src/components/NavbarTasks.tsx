import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Input from "./Input";
import { useState } from 'react';
import { TaskInterface } from '../interfaces/TaskInterface';

interface NavbarTasks {
    tasks: TaskInterface[],
    addTask: (newTask: { title: string, category: string }) => void,
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function NavbarTasks({ tasks, addTask }: NavbarTasks) {

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
        e.preventDefault();
        addTask({ title, category });
        setOpen(false);
        setTitle("");
        setCategory("");
    }

    const categoryArray = tasks.reduce((acc, task) => {
        if (!acc.includes(task.category)) {
            acc.push(task.category);
        }
        return acc;
    }, [] as string[]);

    return (
        <>
            <div className='nav-tasks'>
                <button onClick={() => setOpen(true)}>Añadir tarea</button>
                <select name="friltroTareas" id="friltroTareas">
                    {
                        categoryArray.map(category => <option key={category} id={category}>{category}</option>)
                    }
                </select>
            </div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit} className='addTaskForm'>
                        <Input
                            type="text"
                            name="tarea"
                            id="tarea"
                            placeholder="Tarea"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                        <Input
                            type="text"
                            name="categoria"
                            id="categoria"
                            placeholder="Categoría"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)} />
                        <button onClick={handleSubmit}>Enviar</button>
                    </form>
                </Box>
            </Modal>
        </>
    )
}