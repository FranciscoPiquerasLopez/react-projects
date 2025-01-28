export default function ListaDeFrutasConEliminar({ onClick, children, index }) {

    const handleClickDeleteFruit = () => {
        onClick(index);
    }

    return (
        <button onClick={handleClickDeleteFruit}>{children}</button>
    )
}