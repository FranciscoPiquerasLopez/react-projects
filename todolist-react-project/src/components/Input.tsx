import React, { useState } from "react"

interface InputProps {
    type?: string,
    name: string,
    id: string,
    placeholder?: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ type = "text", name, id, placeholder, value, onChange }: InputProps) {

    const [error, setError] = useState<string>("");

    const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e); // Le pasamos el evento al padre a través del prop onChange

        const eventValue = e.target.value; // Valor del evento

        if (eventValue.trim() === "") {
            setError("No debe estar vacío");
        } else if (eventValue.length < 3) {
            setError("Debe tener al menos 3 caracteres");
        } else {
            setError("");
        }
    }

    return (
        <>
            <input
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={handleValidation} />
            <span style={{ color: 'red', fontWeight: 'bold' }}>{error}</span>
        </>
    )
}