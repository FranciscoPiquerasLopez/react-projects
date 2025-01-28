import { useState } from "react";

export default function ListaDeFrutasConAgregar({ onClick, filteredValue }) {

    const [inputText, setInputText] = useState("");
    const [error, setError] = useState("");

    const handleClickAddFruitOrSubmitForm = (e) => {
        e.preventDefault();
        if (inputText.trim() === "") {
            setError("El nombre de la fruta no puede estar vacío.");
        } else {
            setError("");
            onClick(inputText);
            setInputText("");
        }
    }

    return (
        <>
            <form onSubmit={handleClickAddFruitOrSubmitForm} className="formFruit">
                <input
                    type="text"
                    name="addFruit"
                    id="addFruit"
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    disabled={filteredValue} />

                <button disabled={filteredValue} onClick={handleClickAddFruitOrSubmitForm}>Agregar fruta</button>
            </form>
            {error && <span style={{ color: 'red' }}>{error}</span>}
        </>
    )
}