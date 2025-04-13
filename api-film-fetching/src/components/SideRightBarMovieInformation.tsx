import { useDataOfMovie, useMovieGenres } from "../hooks/useMovies";
import useMoviesStore from "../store/useMoviesStore";
import { easeInOut, motion } from "framer-motion";
import { API_IMAGE } from "../utils/constants";

export default function SideRightBarMovieInformation() {

    // Zustand
    const visibleMovieInformation = useMoviesStore((state) => state.visibleMovieInformation);
    const selectedMovieId = useMoviesStore((state) => state.selectedMovieId);
    const setVisibleMovieInformation = useMoviesStore((state) => state.setVisibleMovieInformation);

    // Datos de la película seleccionada por el usuario
    const { data, error, isLoading } = useDataOfMovie(selectedMovieId);
    const { data: listOfGenres, error: errorGenres } = useMovieGenres();

    if (isLoading) return <p>Cargando...</p>;
    if (error) return <p>Error al obtener la película: {error.message}</p>;
    if (errorGenres) return <p>Error al obtener los géneros: {errorGenres.message}</p>;

    const handleClick = () => {
        setVisibleMovieInformation();
    };

    return (
        // Framer Motion - Biblioteca de animaciones para React
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: visibleMovieInformation ? 0 : '100%' }}
            transition={{ duration: 0.3, ease: easeInOut }}
            className="fixed top-0 right-0 h-full w-[300px] bg-[#1d1d20] p-10 flex flex-col gap-y-3"
        >
            <img
                src={`${API_IMAGE}${data?.poster_path}`}
                alt={data?.title} />
            <h3 className="text-lg font-bold">{data?.title}</h3>
            <span className="font-semibold">{data?.overview}</span>
            <div>
                {
                    data?.genres.map((idGenre, index) => {
                        const genre = listOfGenres?.find(g => g.id === idGenre);
                        return index !== data?.genres.length - 1
                            ? <span key={index}>{genre?.name}, </span>
                            : <span key={index}>{genre?.name}</span>
                    })
                }
            </div>

            {/** Botón para cerrar el panel */}
            <button
                onClick={handleClick}
                className="absolute top-0 left-0 px-3 py-2 text-[22px] cursor-pointer font-bold">
                X
            </button>
        </motion.div>
    );
};