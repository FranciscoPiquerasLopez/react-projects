import axios from "axios";

const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZGRhNzRmNTFjZDZhZGQzOTFkMTIwZjkyYzJhNzM2MiIsIm5iZiI6MTc0NDAyNDQwNi42NjUsInN1YiI6IjY3ZjNiMzU2MzFjOWYyNzI5OWFkMGM2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BcEp08YLdTDyrT8Pg-cS2XCnjnFb-jaOw435AjUpYqQ';

export const tmdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    params: {
        language: 'es-ES',
    }
});

export const tmbdImageUrlBase = axios.create({
    baseURL: 'https://image.tmdb.org/t/p/w500',
    headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
    }
});