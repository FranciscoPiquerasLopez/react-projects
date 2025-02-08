import { useEffect, useReducer, useState } from "react";
import ListaDeFrutasConAgregar from "./ListaDeFrutasConAgregar";
import ListaDeFrutasConEliminar from "./ListaDeFrutasConEliminar";
import ListaDeFrutasConModificar from "./ListaDeFrutasConModificar";
import ListaDeFrutasFiltradas from "./ListaDeFrutasFiltradas";
import ListaDeFrutasOrdenada from "./ListaDeFrutasOrdenada";
import CarritoDeCompras from "./CarritoDeCompras";
import AgregarProductoCarrito from "./AgregarProductoCarrito";
import fruitReducer from "../utils/fruitReducer";
import { ListFruitContext } from "../utils/ListFruitContext";
import useCart from "../hooks/useCart";

export default function ListaDeFrutas() {

    // Initial fruits
    const initialStateFruits = ["Manzana", "Banana", "Cereza"];

    // useReducer
    const [fruits, dispatch] = useReducer(fruitReducer, initialStateFruits);

    // useState
    const [filteredFruits, setFilteredFruits] = useState(fruits);
    const [filtered, setFiltered] = useState(false);

    // Custom Hooks
    const [cart, addCart] = useCart();

    useEffect(() => {
        setFilteredFruits(fruits);
    }, [fruits]);

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
        const fruitNameTrimmed = fruitName.trim().toLowerCase();

        const newArrayFiltrated = fruitNameTrimmed === ""
            ? fruits
            : fruits.filter(fruit => fruit.toLowerCase().includes(fruitNameTrimmed));

        setFiltered(fruitNameTrimmed !== "");
        setFilteredFruits(newArrayFiltrated);
    }

    return (
        <>
            <ListFruitContext.Provider value={cart}>
                <CarritoDeCompras />
            </ListFruitContext.Provider>

            <div className="containerFruits">

                <ListaDeFrutasFiltradas updateArrayFruits={filtrateArrayByFruitSearchInput}></ListaDeFrutasFiltradas>

                <ListaDeFrutasConAgregar
                    onClick={handleClickAddFruit}
                    filteredValue={filtered}></ListaDeFrutasConAgregar>

                <ListaDeFrutasOrdenada onChange={sortArrayFruits}></ListaDeFrutasOrdenada>

                <ul>
                    {
                        filteredFruits.map((fruit, index) => {
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
                                        fruitToAdd={fruit}
                                        onClick={addCart}>
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