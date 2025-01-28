export default function AgregarProductoCarrito({ index, onClick }) {

    const handleClickAddFruitToCart = () => {
        onClick(index);
    }

    return (
        <button onClick={handleClickAddFruitToCart}>Añadir al carrito</button>
    )
}