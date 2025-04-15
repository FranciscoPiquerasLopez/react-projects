import { useDataMoviesByName, useNowPlayingMovies, usePopularMovies, useUpcomingMovies } from "./useMovies";

export default function useMoviesToShow(section: string, searchMovieNameValue: string) {

    // Ejecutamos todos los custom hooks a la vez
    const moviesByName = useDataMoviesByName(searchMovieNameValue);
    const popularMovies = usePopularMovies();
    const nowPlayingMovies = useNowPlayingMovies();
    const upcomingMovies = useUpcomingMovies();

    // Según lo que nos interese, enviamos uno u otro
    if (searchMovieNameValue !== "") {
        return moviesByName;
    } else {
        switch (section) {
            case "peliculasPopulares": return popularMovies;
            case "peliculasCartelera": return nowPlayingMovies;
            case "proximosEstrenos": return upcomingMovies;
            default: return popularMovies;
        }
    }
};