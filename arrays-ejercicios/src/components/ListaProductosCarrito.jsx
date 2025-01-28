export default function ListaProductosCarrito({ listFruits }) {
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