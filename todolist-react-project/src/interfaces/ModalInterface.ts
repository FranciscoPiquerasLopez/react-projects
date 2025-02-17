import { TaskInterface } from "./TaskInterface";

export interface ModalInterface {
    submit?: (title: string, category: string) => void,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    titleProp: string | "",
    categoryProp: string | "",
    index?: number,
    handleEdit?: (task: TaskInterface, index: number) => void
}