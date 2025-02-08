import { useContext } from "react"
import { ListFruitContext } from "../utils/ListFruitContext";

export default function ListaProductosCarrito() {

    const listFruits = useContext(ListFruitContext);
    
    return (
        <ul>
            {
                listFruits.map((fruit, index) => {
                    return <li key={index}>{fruit}</li>
                })
            }
        </ul>
    )
}