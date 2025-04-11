import { useQuery } from "@tanstack/react-query";
import { getDataOfMovieById, getNowPlayingMovies, getPopularMovies, getUpcomingMovies } from "../api/movies";

// Para consumir el endpoint de obtener las películas favoritas
export const usePopularMovies = () => {
    return useQuery({
        queryKey: ['popularMovies'],
        queryFn: getPopularMovies,
    });
};

// Consumir el endpoint de películas en cartelera
export const useNowPlayingMovies = () => {
    return useQuery({
        queryKey: ['nowPlayingMovies'],
        queryFn: getNowPlayingMovies
    });
};

// Consumir el endpoint de próximas películas en cartelera (estrenos de películas)
export const useUpcomingMovies = () => {
    return useQuery({
        queryKey: ['upcomingMovies'],
        queryFn: getUpcomingMovies
    });
};

// Consumir el endpoint de información de película específica
export const useDataOfMovie = (movieId: number) => {
    return useQuery({
        queryKey: ['dataOfMovieById', movieId],
        queryFn: () => getDataOfMovieById(movieId)
    });
};