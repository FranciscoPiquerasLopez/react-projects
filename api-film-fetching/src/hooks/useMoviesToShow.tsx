import useFavoritesStore from "../store/useFavoritesStore";
import { useDataMoviesByName, useNowPlayingMovies, usePopularMovies, useUpcomingMovies } from "./useMovies";

export default function useMoviesToShow(section: string, searchMovieNameValue: string) {

    // Ejecutamos todos los custom hooks a la vez
    const moviesByName = useDataMoviesByName(searchMovieNameValue);
    const popularMovies = usePopularMovies();
    const nowPlayingMovies = useNowPlayingMovies();
    const upcomingMovies = useUpcomingMovies();

    // Películas favoritas
    const { favorites } = useFavoritesStore.getState();

    // Según lo que nos interese, enviamos uno u otro
    if (searchMovieNameValue !== "") {
        return moviesByName;
    } else {
        switch (section) {
            case "peliculasPopulares": return popularMovies;
            case "peliculasCartelera": return nowPlayingMovies;
            case "proximosEstrenos": return upcomingMovies;
            case "peliculasFavoritas": return { data: favorites, error: null, isLoading: false };
            default: return popularMovies;
        }
    }
};