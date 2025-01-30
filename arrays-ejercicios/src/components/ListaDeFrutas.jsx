import { useReducer, useState } from "react";
import ListaDeFrutasConAgregar from "./ListaDeFrutasConAgregar";
import ListaDeFrutasConEliminar from "./ListaDeFrutasConEliminar";
import ListaDeFrutasConModificar from "./ListaDeFrutasConModificar";
import ListaDeFrutasFiltradas from "./ListaDeFrutasFiltradas";
import ListaDeFrutasOrdenada from "./ListaDeFrutasOrdenada";
import CarritoDeCompras from "./CarritoDeCompras";
import AgregarProductoCarrito from "./AgregarProductoCarrito";
import fruitReducer from "../utils/fruitReducer";

export default function ListaDeFrutas() {

    // Initial fruits
    const initialStateFruits = ["Manzana", "Banana", "Cereza"];

    // useReducer
    const [fruits, dispatch] = useReducer(fruitReducer, initialStateFruits);

    // useState
    const [copyFruits, setCopyFruits] = useState(fruits);
    const [filtered, setFiltered] = useState(false);
    const [cart, setCart] = useState([]);

    function handleClickAddFruit(fruitToAdd) {
        dispatch({
            type: 'added',
            fruit: fruitToAdd
        });
    }

    function handleClickDeleteFruit(indexFruitToDelete) {
        dispatch({
            type: 'deleted',
            fruit: fruits[indexFruitToDelete]
        });
    }

    function handleClickEditFruit(fruitName, index) {
        dispatch({
            type: 'edited',
            fruit: fruitName,
            indexFruit: index
        });
    }

    function sortArrayFruits(valueCheckToSortFruits) {
        dispatch({
            type: 'sorted',
            checkValue: valueCheckToSortFruits
        });
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