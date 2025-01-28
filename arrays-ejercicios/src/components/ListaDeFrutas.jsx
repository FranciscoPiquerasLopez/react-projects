import { useState } from "react";
import ListaDeFrutasConAgregar from "./ListaDeFrutasConAgregar";
import ListaDeFrutasConEliminar from "./ListaDeFrutasConEliminar";
import ListaDeFrutasConModificar from "./ListaDeFrutasConModificar";
import ListaDeFrutasFiltradas from "./ListaDeFrutasFiltradas";
import ListaDeFrutasOrdenada from "./ListaDeFrutasOrdenada";
import CarritoDeCompras from "./CarritoDeCompras";
import AgregarProductoCarrito from "./AgregarProductoCarrito";

export default function ListaDeFrutas() {

    const [fruits, setFruits] = useState(["Manzana", "Banana", "Cereza"]);
    const [copyFruits, setCopyFruits] = useState(fruits);
    const [filtered, setFiltered] = useState(false);
    const [cart, setCart] = useState([]);

    function handleClickAddFruit(fruitToAdd) {
        const newArrayFruits = [...fruits];
        newArrayFruits.push(fruitToAdd);
        setFruits(newArrayFruits);
        setCopyFruits(newArrayFruits);
    }

    function handleClickDeleteFruit(indexFruitToDelete) {
        const newArrayFruits = [...fruits];
        newArrayFruits.splice(indexFruitToDelete, 1);
        setFruits(newArrayFruits);
        setCopyFruits(newArrayFruits);
    }

    function handleClickEditFruit(fruitName, index) {
        const newArrayFruits = [...fruits];
        newArrayFruits.splice(index, 1, fruitName);
        setFruits(newArrayFruits);
        setCopyFruits(newArrayFruits);
    }

    function sortArrayFruits(valueCheckToSortFruits) {
        const newArrayFruits = [...fruits];

        valueCheckToSortFruits ? setFiltered(true) : setFiltered(false);
        valueCheckToSortFruits ? newArrayFruits.sort() : newArrayFruits.sort((a, b) => b.localeCompare(a));
        setFruits(newArrayFruits);
    }

    function filtrateArrayByFruitSearchInput(fruitName) {
        const newArrayFiltrated = copyFruits.filter(fruit => {
            const fruitValueArray = fruit.toLowerCase();
            const fruitToSearch = fruitName.toLowerCase();

            return fruitValueArray.indexOf(fruitToSearch) != -1;
        })

        fruitName.trim() === "" ? setFiltered(false) : setFiltered(true);
        fruitName.trim() === "" ? setFruits(copyFruits) : setFruits(newArrayFiltrated);
    }

    function handleClickAddFruitToCart(indexFruitToAddCart) {

        if (cart.indexOf(cart[indexFruitToAddCart]) !== -1) return;

        const newCart = [...cart];
        const fruitToAdd = fruits[indexFruitToAddCart];

        newCart.push(fruitToAdd);
        setCart(newCart);
    }

    return (
        <>
            <CarritoDeCompras listFruits={cart}></CarritoDeCompras>

            <div className="containerFruits">

                <ListaDeFrutasFiltradas updateArrayFruits={filtrateArrayByFruitSearchInput}></ListaDeFrutasFiltradas>

                <ListaDeFrutasConAgregar
                    onClick={handleClickAddFruit}
                    filteredValue={filtered}></ListaDeFrutasConAgregar>

                <ListaDeFrutasOrdenada onChange={sortArrayFruits}></ListaDeFrutasOrdenada>

                <ul>
                    {
                        fruits.map((fruit, index) => {
                            return (
                                <li key={fruit} className="showFruits">
                                    {fruit}
                                    <ListaDeFrutasConEliminar
                                        onClick={handleClickDeleteFruit}
                                        index={index}>
                                        Eliminar
                                    </ListaDeFrutasConEliminar>

                                    <ListaDeFrutasConModificar
                                        onClick={handleClickEditFruit}
                                        fruit={fruit}
                                        index={index}>
                                    </ListaDeFrutasConModificar>

                                    <AgregarProductoCarrito
                                        index={index}
                                        onClick={handleClickAddFruitToCart}>
                                    </AgregarProductoCarrito>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}