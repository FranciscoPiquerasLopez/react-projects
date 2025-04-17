import { motion } from "framer-motion";
import { API_IMAGE } from "../utils/constants";
import { useMovieGenres } from "../hooks/useMovies";
import useMoviesStore from "../store/useMoviesStore";
import { MovieInterface } from "../interfaces/MovieInterface";
import useMoviesToShow from "../hooks/useMoviesToShow";
import getTitleBySection from "../utils/getTitleBySection";
import FilterBar from "./FilterBar";
import useMovieFilters from "../hooks/useMovieFilters";

export default function ContentMovies() {

    // Zustand
    const setVisibleMovieInformation = useMoviesStore((state) => state.setVisibleMovieInformation);
    const setSelectedMovieId = useMoviesStore((state) => state.setSelectedMovieId);
    const section = useMoviesStore((state) => state.section);
    const movieName = useMoviesStore((state) => state.movieName);

    // Custom hooks
    const { data, error, isLoading } = useMoviesToShow(section, movieName);
    const { data: listOfGenres, error: errorGenres } = useMovieGenres();

    // Filtros aplicados a las películas - custom hook
    const { filteredMovies } = useMovieFilters(data);

    // Obtener el título
    const title = getTitleBySection(section, movieName);

    if (isLoading) return <p>Cargando...</p>;
    if (error) return <p>Error al obtener las películas: {error.message}</p>;
    if (errorGenres) return <p>Error al obtener los géneros: {errorGenres.message}</p>;

    // Handle click
    const handleClick = (idMovie: number) => {
        setVisibleMovieInformation();
        setSelectedMovieId(idMovie);
    };

    return (
        <motion.main
            key={section + movieName}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full z-0"
        >
            <h1 className='text-4xl text-start mb-10'>{title}</h1>
            <FilterBar genres={listOfGenres} />
            <div className='pr-8 grid gap-x-3 gap-y-5 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]'>
                {
                    filteredMovies?.map((movie: MovieInterface) => {
                        return (
                            <div key={movie.id} className="relative group max-w-[250px]">
                                {/** Imágen del poster de la película */}
                                <img
                                    src={`${API_IMAGE}${movie.poster_path}`}
                                    alt={movie.title}
                                    className="rounded-lg" />

                                {/** Valoración de la película */}
                                <div className="z-10 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-3 bg-yellow-500 rounded-2xl">
                                    <span>{movie.vote_average.toFixed(1)}</span>
                                </div>

                                {/** Overlay con la información de la película que aparece al hacer hover en la imágen */}
                                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-5 justify-center items-center p-4 text-white rounded-lg">
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
                                        className="cursor-pointer px-4 py-1 bg-white text-black rounded animation duration-500 ease-in-out hover:bg-gray-300"
                                        onClick={() => handleClick(movie.id)}>
                                        Ver más
                                    </button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </motion.main>
    );
};