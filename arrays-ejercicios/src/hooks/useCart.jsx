import { useState } from "react";

export default function useCart() {
    const [cart, setCart] = useState([]);

    function addCart(newElement) {
        if (cart.indexOf(newElement) !== -1) return; // Lo ha encontrado

        // Para garantizar que vamos a trabajar con el valor previo de estado cart y no con uno que no ha
        // sido actualizado aún
        setCart(prevCart => [...prevCart, newElement]);
    }

    return [cart, addCart];
}