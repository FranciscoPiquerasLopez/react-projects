import { MovieInterface } from "../interfaces/MovieInterface";
import useMoviesStore from "../store/useMoviesStore";

export default function useMovieFilters(movies: MovieInterface[] | undefined) {

    // ZUSTAND
    const ratingMoviesFilter = useMoviesStore((state) => state.ratingMoviesFilter);
    const selectedGenreFilter = useMoviesStore((state) => state.selectedGenreFilter);

    let filteredMovies: MovieInterface[] = [];

    // Películas filtradas por puntuación y género
    filteredMovies = movies?.filter((movie) => {
        // Filtrar por rating mínimo
        const matchesRating = movie.vote_average >= ratingMoviesFilter;

        // Filtrar por género si hay alguno seleccionado
        const matchesGenre = selectedGenreFilter !== 0
            ? movie.genre_ids.includes(selectedGenreFilter)
            : true;

        // Retornar true solo si cumple ambos
        return matchesRating && matchesGenre;
    }) || [];

    return { filteredMovies };
};