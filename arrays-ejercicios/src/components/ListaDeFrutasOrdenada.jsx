import { useState } from "react"

export default function ListaDeFrutasOrdenada({ onChange }) {

    const [checkFruits, setCheckFruits] = useState(false);

    const handleChangeCheckBox = (e) => {
        const valueCheckBox = e.target.checked;
        setCheckFruits(valueCheckBox);
        onChange(valueCheckBox);
    }

    return (
        <div className="sortFruitsContianer">
            <label htmlFor="sortFruitsCheck">Ordenar frutas:</label>
            <input
                type="checkbox"
                name="sortFruitsCheck"
                id="sortFruitsCheck"
                checked={checkFruits}
                onChange={handleChangeCheckBox} />
        </div>
    )
}