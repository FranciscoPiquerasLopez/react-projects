import { MovieGenresInterface } from "../interfaces/MovieGenresInterface";
import { MovieInterface } from "../interfaces/MovieInterface";
import { tmdb } from "./tmdb";

// Obtener películas populares
export const getPopularMovies = async (): Promise<MovieInterface[]> => {
    const res = await tmdb.get('/discover/movie', {
        params: {
            include_adult: false,
            include_video: false,
            page: 1,
            sort_by: 'popularity.desc',
        }
    });
    return res.data.results;
};

// Obtener películas que hay ahora en cartelera
export const getNowPlayingMovies = async (): Promise<MovieInterface[]> => {
    const res = await tmdb.get('/movie/now_playing');
    return res.data.results;
};

// Obtener próximos estrenos de películas
export const getUpcomingMovies = async (): Promise<MovieInterface[]> => {
    const res = await tmdb.get('/movie/upcoming');
    return res.data.results;
};

// Obtener lista de géneros
export const listOfGenres = async (): Promise<MovieGenresInterface[]> => {
    const res = await tmdb.get('/genre/movie/list');
    return res.data.genres;
};

// Obtener información de una película por su id
export const getDataOfMovieById = async (movieId: number): Promise<MovieInterface> => {
    const res = await tmdb.get(`/movie/${movieId}`);
    return res.data;
};