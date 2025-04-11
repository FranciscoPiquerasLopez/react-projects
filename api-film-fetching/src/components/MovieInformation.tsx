import { useParams } from "react-router";

export default function MovieInformation() {

    const { movieId } = useParams();

    return (
        <h1>Id de la movie es: {movieId}</h1>
    );
};