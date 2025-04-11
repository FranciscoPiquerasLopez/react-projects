import { useNavigate } from "react-router";
import { useNowPlayingMovies } from "../hooks/useMovies";
import { NowPlayingMoviesInterface } from "../interfaces/NowPlayingMoviesInterface";
import { API_IMAGE } from "../utils/constants";

export default function NowPlayingMoviesContent() {

    const { data: nowPlayingMovies, error: errorNowPlayingMovies, isLoading } = useNowPlayingMovies();

    const navigate = useNavigate();

    if (isLoading) return <p>Cargando...</p>;
    if (errorNowPlayingMovies) return <p>Error: {errorNowPlayingMovies.message}</p>;

    return (
        <main className="w-full animate-fade-up">
            <h1 className='text-4xl text-start mb-10'>Películas en cartelera</h1>
            <div className='grid gap-3 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]'>
                {
                    nowPlayingMovies?.map((movie: NowPlayingMoviesInterface) => {
                        return (
                            <div key={movie.id} className="relative group cursor-pointer">
                                {/** Imágen del poster de la película */}
                                <img
                                    src={`${API_IMAGE}${movie.poster_path}`}
                                    alt={movie.title}
                                    className="rounded-lg" />

                                {/** Overlay con la información de la película que aparece al hacer hover en la imágen */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-5 justify-center items-center p-4 text-white rounded-lg">
                                    <h3 className="text-lg font-semibold">{movie.title}</h3>
                                    <span>⭐ {movie.vote_average.toFixed(1)}</span>
                                    <button
                                        className="cursor-pointer px-4 py-1 bg-white text-black rounded hover:bg-gray-200"
                                        onClick={() => navigate(`/movie/${movie.id}`)}>
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