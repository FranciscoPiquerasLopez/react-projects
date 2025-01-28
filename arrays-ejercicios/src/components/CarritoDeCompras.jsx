import { useState } from "react"
import ListaProductosCarrito from "./ListaProductosCarrito";

export default function CarritoDeCompras({ listFruits }) {

    const [listProduct, setListProduct] = useState("false");

    const handleClickCartIcon = () => {
        setListProduct(!listProduct);
    }

    return (
        <div className="parent-container">
            {
                listProduct ?
                    (
                        <img onClick={handleClickCartIcon} className="close-icon" src="/src/assets/close.svg" alt="Close svg icon" />
                    ) : (
                        <img onClick={handleClickCartIcon} className="cart-icon" src="/src/assets/cart.svg" alt="Cart svg icon" />
                    )
            }
            <div className={"list-products " + (listProduct ? "showProductList" : "hideProductList")}>
                <ListaProductosCarrito listFruits={listFruits}></ListaProductosCarrito>
            </div>
        </div>
    )
}