import { IconButton } from "@mui/material";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ModalComponent from "./ModalComponent";


export default function Tasks({ index, title, category, check, handleDelete, handleCheck }:
    {
        index: number,
        title: string,
        category: string,
        check: boolean,
        handleDelete: (index: number) => void,
        handleCheck: (index: number) => void,
    }) {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <div className="task">
                <div className="show-task">
                    <label>
                        <input type="checkbox" name="checkbox-task" id="checkbox-task" checked={check} onChange={() => handleCheck(index)} />
                        {check
                            ? <span className='line-through'>{title}</span>
                            : <span>{title}</span>}
                    </label>
                    <span>Categoría: {category}</span>
                </div>
                <div className="options-task">
                    <IconButton aria-label="delete" onClick={() => handleDelete(index)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => setOpen(true)}>
                        <EditIcon />
                    </IconButton>
                </div>
            </div>
            <ModalComponent
                modalType='editTask'
                open={open}
                setOpen={setOpen}
                titleProp={title}
                categoryProp={category}
                check={check}
                index={index} />
        </>
    )
}