import { useState } from "react";
import { useTaskContext } from "./useTaskContext";

interface TaskModalFormsProps {
    titleProp: string;
    categoryProp: string;
    check: boolean;
    index: number | undefined;
}

export default function useEditTaskForm({ titleProp, categoryProp, check, index }: TaskModalFormsProps) {

    const { editTask } = useTaskContext();

    const [title, setTitle] = useState<string | "">(titleProp);
    const [category, setCategory] = useState<string | "">(categoryProp);

    const handleSubmitEdit = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
        e.preventDefault();
        editTask({ title, category, check }, index!);
    }

    return { title, setTitle, category, setCategory, handleSubmitEdit };
}