import { useState } from "react";
import { useTaskContext } from "./useTaskContext";

export default function useAddTaskForm() {

    const check = false;

    // Context
    const { handleAddTask } = useTaskContext();

    // States
    const [title, setTitle] = useState<string>("");
    const [category, setCategory] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
        e.preventDefault();
        handleAddTask({ title, category, check });
        setTitle("");
        setCategory("");
    }

    return { title, setTitle, category, setCategory, handleSubmit }
}