export default function AgregarProductoCarrito({ fruitToAdd, onClick }) {

    const handleClickAddFruitToCart = () => {
        onClick(fruitToAdd);
    }

    return (
        <button onClick={handleClickAddFruitToCart}>Añadir al carrito</button>
    )
}