import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TaskInterface } from "../interfaces/TaskInterface";
import ModalComponent from "./ModalComponent";
import { useState } from "react";


export default function Tasks({ index, title, category, handleDelete, handleEdit }:
    {
        index: number,
        title: string,
        category: string,
        handleDelete: (task: TaskInterface) => void,
        handleEdit: (task: TaskInterface, index: number) => void
    }) {

    const [open, setOpen] = useState<boolean>(false);
    const [check, setCheck] = useState<boolean>(false);

    return (
        <>
            <div className="task">
                <div className="show-task">
                    <label>
                        <input type="checkbox" name="checkbox-task" id="checkbox-task" onChange={() => setCheck(!check)} />
                        {check
                            ? <span className='line-through'>{title}</span>
                            : <span>{title}</span>}
                    </label>
                    <span>Categoría: {category}</span>
                </div>
                <div className="options-task">
                    <IconButton aria-label="delete" onClick={() => handleDelete({ title, category })}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => setOpen(true)}>
                        <EditIcon />
                    </IconButton>
                </div>
            </div>
            <ModalComponent
                open={open}
                setOpen={setOpen}
                titleProp={title}
                categoryProp={category}
                index={index}
                handleEdit={handleEdit} />
        </>
    )
}