import { useDataOfMovie } from "../hooks/useMovies";
import useMoviesStore from "../store/useMoviesStore";
import { easeInOut, motion } from "framer-motion";
import { API_IMAGE } from "../utils/constants";
import { CircleX } from 'lucide-react';

export default function SideRightBarMovieInformation() {

    // Zustand
    const visibleMovieInformation = useMoviesStore((state) => state.visibleMovieInformation);
    const selectedMovieId = useMoviesStore((state) => state.selectedMovieId);
    const setVisibleMovieInformation = useMoviesStore((state) => state.toggleMovieInformationVisibility);

    // Datos de la película seleccionada por el usuario
    const { data, error, isLoading } = useDataOfMovie(selectedMovieId);

    if (isLoading) return <p>Cargando...</p>;
    if (error) return <p>Error al obtener la película: {error.message}</p>;

    const handleClick = () => {
        setVisibleMovieInformation();
    };

    return (
        // Framer Motion - Biblioteca de animaciones para React
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: visibleMovieInformation ? 0 : '100%' }}
            transition={{ duration: 0.4, ease: easeInOut }}
            className="fixed top-0 right-0 h-full w-[300px] bg-[#1d1d20] p-10 flex flex-col gap-y-3 shadow-2xl"
        >
            <img
                src={`${API_IMAGE}${data?.poster_path}`}
                alt={data?.title} />
            <h3 className="text-2xl font-bold mb-2">{data?.title}</h3>
            <span className="text-sm text-gray-400 mb-4">{data?.overview}</span>
            <div className="flex flex-wrap gap-2">
                {
                    data?.genres.map((genreObject) => (
                        <span key={genreObject.id} className="bg-[#2c2c30] text-sm px-3 py-1 rounded-full">
                            {genreObject.name}
                        </span>
                    ))
                }
            </div>

            {/** Botón para cerrar el panel */}
            <button
                onClick={handleClick}
                className="absolute top-3 left-3 text-shadow-gray-400 hover:text-white text-2xl cursor-pointer">
                <CircleX className="text-white w-6 h-6 transition-transform duration-200 hover:scale-110" />
            </button>
        </motion.div>
    );
};