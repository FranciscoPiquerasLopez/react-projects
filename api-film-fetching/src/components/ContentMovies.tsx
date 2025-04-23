import { motion } from "framer-motion";
import { API_IMAGE } from "../utils/constants";
import { useMovieGenres } from "../hooks/useMovies";
import useMoviesStore from "../store/useMoviesStore";
import { MovieInterface } from "../interfaces/MovieInterface";
import useMoviesToShow from "../hooks/useMoviesToShow";
import getTitleBySection from "../utils/getTitleBySection";
import FilterBar from "./FilterBar";
import useMovieFilters from "../hooks/useMovieFilters";
import useFavoritesStore from "../store/useFavoritesStore";
import MovieSkeletonLoader from "./MovieSkeletonLoader";
import Star from "../icons/Star";

export default function ContentMovies() {
    // Zustand
    const setVisibleMovieInformation = useMoviesStore((state) => state.toggleMovieInformationVisibility);
    const setSelectedMovieId = useMoviesStore((state) => state.setSelectedMovieId);
    const section = useMoviesStore((state) => state.section);
    const movieName = useMoviesStore((state) => state.movieName);

    // Zustand favorites store
    const favorites = useFavoritesStore((state) => state.favorites);

    // Custom hooks
    const { data, error, isLoading } = useMoviesToShow(section, movieName);
    const { data: listOfGenres, error: errorGenres } = useMovieGenres();

    // Filtros aplicados a las películas - custom hook
    const { filteredMovies } = useMovieFilters(data);

    // Obtener el título
    const title = getTitleBySection(section, movieName);

    if (isLoading) return (
        <div className="pr-8 grid gap-x-3 gap-y-5 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]">
            {
                Array.from({ length: 8 }).map((_, i) => (
                    <MovieSkeletonLoader key={i} data-testid={`movie-skeleton-${i}`} />
                ))
            }
        </div>
    );
    if (error) return <p>Error al obtener las películas: {error.message}</p>;
    if (errorGenres) return <p>Error al obtener los géneros: {errorGenres.message}</p>;

    // Handle click en el botón de "ver más" en una película
    const handleClickMovie = (idMovie: number) => {
        setVisibleMovieInformation();
        setSelectedMovieId(idMovie);
    };

    // Handle click para añadir película a favoritos con el store de Zustand
    const handleClickAddMovieToFavorites = (movieToAddIntoFavoritesStore: MovieInterface) => {

        // Zustand favorites store
        const { favorites, addFavorite, removeFavorite } = useFavoritesStore.getState();

        // Comprobamos si esa película ya está guardada como favoritos para así agregarla o eliminarla del store
        const isAlreadyFavorites = favorites.some((fav) => fav.id === movieToAddIntoFavoritesStore.id);

        if (isAlreadyFavorites) {
            removeFavorite(movieToAddIntoFavoritesStore.id);
        } else {
            addFavorite(movieToAddIntoFavoritesStore);
        }
    };

    return (
        <motion.main
            role="main"
            aria-label={title}
            key={section + movieName}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full z-0"
        >
            <h1 className='text-4xl text-start mb-10'>{title}</h1>
            <FilterBar genres={listOfGenres} />
            <div role="list" className='pr-8 grid gap-x-3 gap-y-5 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]'>
                {
                    filteredMovies?.map((movie: MovieInterface) => {
                        return (
                            <div key={movie.id} role="listitem" className="relative group max-w-[250px]">
                                {/** Imágen del poster de la película */}
                                <img
                                    src={`${API_IMAGE}${movie.poster_path}`}
                                    alt={movie.title}
                                    className="rounded-lg" />

                                {/** Valoración de la película */}
                                <div
                                    aria-label={`Puntuación de la película ${movie.title}: ${movie.vote_average.toFixed(1)}`}
                                    className="z-10 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-3 bg-yellow-500 rounded-2xl"
                                >
                                    <span>{movie.vote_average.toFixed(1)}</span>
                                </div>

                                {/** Overlay con la información de la película que aparece al hacer hover en la imágen */}
                                <div className="h-[375px] absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-5 justify-center items-center p-4 text-white rounded-lg">
                                    <h3 className="text-lg font-bold">{movie.title}</h3>
                                    <div>
                                        {
                                            movie.genre_ids.map((idGenre, index) => {
                                                const genre = listOfGenres?.find(g => g.id === idGenre);
                                                return index !== movie.genre_ids.length - 1
                                                    ? <span key={index}>{genre?.name}, </span>
                                                    : <span key={index}>{genre?.name}</span>
                                            })
                                        }
                                    </div>
                                    <button
                                        aria-label={`Ver más sobre ${movie.title}`}
                                        className="cursor-pointer px-4 py-1 bg-white text-black rounded animation duration-500 ease-in-out hover:bg-gray-300"
                                        onClick={() => handleClickMovie(movie.id)}>
                                        Ver más
                                    </button>
                                </div>

                                {/** Guardar película en favoritos */}
                                <button
                                    aria-label={
                                        favorites.some((fav) => fav.id === movie.id)
                                            ? `Quitar ${movie.title} de favoritos`
                                            : `Agregar ${movie.title} a favoritos`
                                    }
                                    onClick={() => handleClickAddMovieToFavorites(movie)}
                                >
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            scale: favorites.some((fav) => fav.id === movie.id) ? 1.2 : 1,
                                            rotate: favorites.some((fav) => fav.id === movie.id) ? 20 : 0,
                                            color: favorites.some((fav) => fav.id === movie.id) ? "#fbbf24" : "#ffffff",
                                            fill: favorites.some((fav) => fav.id === movie.id) ? "#fbbf24" : "none",
                                        }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="absolute top-2 right-2 cursor-pointer"
                                    >
                                        <Star />
                                    </motion.div>
                                </button>
                            </div>
                        );
                    })
                }
            </div>
        </motion.main>
    );
};