import { API_IMAGE } from "../utils/constants";
import { UseQueryResult } from "@tanstack/react-query";
import { useMovieGenres } from "../hooks/useMovies";
import useMoviesStore from "../store/useMoviesStore";
import { MovieInterface } from "../interfaces/MovieInterface";

interface ContentMoviesProps {
    title: string;
    endpointHook: () => UseQueryResult<MovieInterface[], Error>;
};

export default function ContentMovies({ title, endpointHook }: ContentMoviesProps) {

    // Custom hooks
    const { data, error, isLoading } = endpointHook();
    const { data: listOfGenres, error: errorGenres } = useMovieGenres();

    // Zustand
    const setVisibleMovieInformation = useMoviesStore((state) => state.setVisibleMovieInformation);
    const setSelectedMovieId = useMoviesStore((state) => state.setSelectedMovieId);

    if (isLoading) return <p>Cargando...</p>;
    if (error) return <p>Error al obtener las películas: {error.message}</p>;
    if (errorGenres) return <p>Error al obtener los géneros: {errorGenres.message}</p>;

    // Handle click
    const handleClick = (idMovie: number) => {
        setVisibleMovieInformation();
        setSelectedMovieId(idMovie);
    };

    return (
        <main className="w-full animate-fade-up">
            <h1 className='text-4xl text-start mb-10'>{title}</h1>
            <div className='pr-8 grid gap-x-3 gap-y-5 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]'>
                {
                    data?.map((movie: MovieInterface) => {
                        return (
                            <div key={movie.id} className="relative group cursor-pointer">
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
                                        className="cursor-pointer px-4 py-1 bg-white text-black rounded hover:bg-gray-200"
                                        onClick={() => handleClick(movie.id)}>
                                        Ver más
                                    </button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </main>
    );
};