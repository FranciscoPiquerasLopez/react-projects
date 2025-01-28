import { useState } from "react"

export default function ListaDeFrutasFiltradas({ updateArrayFruits }) {

    const [inputFiltrate, setInputFiltrate] = useState("");

    const handleChangeInputEdit = (e) => {
        const currentValue = e.target.value;
        setInputFiltrate(currentValue)
        updateArrayFruits(currentValue);
    }

    return (
        <form action="#" className="searchFormFruits">
            <label htmlFor="inputFiltrate">Buscar frutas:</label>
            <input
                type="text"
                name="inputFiltrate"
                id="inputFiltrate"
                value={inputFiltrate}
                onChange={handleChangeInputEdit} />
        </form>
    )
}