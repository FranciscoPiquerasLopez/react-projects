import React, { useState } from "react"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Input from "./Input";

interface NavbarTasksProps {
    categories: string[],
    onClick: (newTask: { title: string, category: string }) => void
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

export default function NavbarTasks({ categories, onClick }: NavbarTasksProps) {

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
        e.preventDefault();
        setOpen(false);
        onClick({ title, category });
    }

    return (
        <>
            <div className='nav-tasks'>
                <button onClick={() => setOpen(true)}>Añadir tarea</button>
                <select name="friltroTareas" id="friltroTareas">
                    {
                        categories.map(category => <option id={category}>{category}</option>)
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