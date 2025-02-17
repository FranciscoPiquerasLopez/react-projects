import { Box, Modal } from "@mui/material";
import { ModalInterface } from "../interfaces/ModalInterface";
import { useState } from "react";
import Input from "./Input";

export default function ModalComponent({ submit, open, setOpen, titleProp, categoryProp, index, handleEdit }: ModalInterface) {

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

    const [title, setTitle] = useState<string | "">(titleProp);
    const [category, setCategory] = useState<string | "">(categoryProp);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
        e.preventDefault();
        submit!(title, category);
        setOpen(false);
        setTitle("");
        setCategory("");
    }

    const handleSubmitEdit = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
        e.preventDefault();
        handleEdit!({ title, category }, index!);
        setOpen(false);
    }

    return (
        <>
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
                        {
                            titleProp === "" && categoryProp === ""
                                ? <button onClick={handleSubmit}>Enviar</button>
                                : <button onClick={handleSubmitEdit}>Editar</button>
                        }
                    </form>
                </Box>
            </Modal>
        </>
    )
}