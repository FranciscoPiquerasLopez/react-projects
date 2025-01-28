import { useState } from "react"

export default function ListaDeFrutasConModificar({ onClick, fruit, index }) {

    const [editText, setEditText] = useState(fruit);

    const handleClickEditFruit = (e) => {
        e.preventDefault();
        onClick(editText, index);
    }

    return (
        <form className="editContainer" onSubmit={handleClickEditFruit}>
            <input
                type="text"
                name="editFruit"
                id="editFruit"
                value={editText}
                onChange={e => setEditText(e.target.value)} />
            <button onClick={handleClickEditFruit}>Modificar</button>
        </form>
    )
}