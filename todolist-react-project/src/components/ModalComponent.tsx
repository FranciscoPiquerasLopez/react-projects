import { Box, Modal } from "@mui/material";
import { ModalInterface } from "../interfaces/ModalInterface";
import { MODAL_STYLE } from "../constants/style.modal";
import Input from "./Input";
import useAddTaskForm from "../hooks/useAddTaskForm";
import useEditTaskForm from "../hooks/useEditTaskForm";

interface OptionsInterface {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit?: (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => void;
    handleSubmitEdit?: (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => void;
}

export default function ModalComponent({ modalType, open, setOpen, titleProp, categoryProp, check, index }: ModalInterface) {

    const addTaskOptions = useAddTaskForm();
    const editTaskOptions = useEditTaskForm({ titleProp, categoryProp, check: check ?? false, index });

    const options: OptionsInterface = modalType === "addTask" ? addTaskOptions : editTaskOptions;

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={MODAL_STYLE}>
                    <form onSubmit={modalType === "addTask" ? options.handleSubmit : options.handleSubmitEdit} className='addTaskForm'>
                        <Input
                            type="text"
                            name="tarea"
                            id="tarea"
                            placeholder="Tarea"
                            value={options.title}
                            onChange={(e) => options.setTitle(e.target.value)} />
                        <Input
                            type="text"
                            name="categoria"
                            id="categoria"
                            placeholder="Categoría"
                            value={options.category}
                            onChange={(e) => options.setCategory(e.target.value)} />
                        {
                            modalType === "addTask"
                                ? <button onClick={options.handleSubmit}>Enviar</button>
                                : <button onClick={options.handleSubmitEdit}>Editar</button>
                        }
                        <button onClick={() => setOpen(false)}>Cerrar</button>
                    </form>
                </Box>
            </Modal>
        </>
    )
}