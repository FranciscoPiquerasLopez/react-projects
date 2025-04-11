import { NowPlayingMoviesInterface } from "../interfaces/NowPlayingMoviesInterface";
import { PopularMoviesInterface } from "../interfaces/PopularMoviesInterface";
import { UpcomingMoviesInterface } from "../interfaces/UpcomingMoviesInterface";
import { tmdb } from "./tmdb";

// Obtener películas populares
export const getPopularMovies = async (): Promise<PopularMoviesInterface[]> => {
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
export const getNowPlayingMovies = async (): Promise<NowPlayingMoviesInterface[]> => {
    const res = await tmdb.get('/movie/now_playing');
    return res.data.results;
};

// Obtener próximos estrenos de películas
export const getUpcomingMovies = async (): Promise<UpcomingMoviesInterface[]> => {
    const res = await tmdb.get('/movie/upcoming');
    return res.data.results;
};

// Obtener información de una película por su id
export const getDataOfMovieById = async (movieId: number) => {
    const res = await tmdb.get(`/movie/${movieId}`);
    return res.data;
};