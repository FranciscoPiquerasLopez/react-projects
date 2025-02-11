import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit">
                        <EditIcon />
                    </IconButton>
                </div>
            </div>
        </div >
    )
}