import { Search } from 'lucide-react';
import { ChangeEvent, useMemo } from 'react';
import useMoviesStore from '../store/useMoviesStore';
import debounce from '../utils/debounce';

export default function HeaderFilms() {

    // Zustand
    const setMovieName = useMoviesStore((state) => state.setMovieName);

    // Debounce personalizado y memoizado con useMemo para memoizar y optimizar el resultado
    const debounceSetMovieName = useMemo(() => {
        return debounce((value: string) => setMovieName(value), 500);
    }, [setMovieName]);

    const handleChangeSearchMovieByName = (e: ChangeEvent<HTMLInputElement>) => {
        debounceSetMovieName(e.target.value);
    };

    return (
        <header className="mt-3 h-14 flex justify-center items-center px-6">
            <form role="search" className="relative w-full max-w-xl" aria-label="Buscador de películas">
                {/** Input search para buscar pelicula/s */}
                <input
                    type="text"
                    name="buscar"
                    id="buscar"
                    placeholder="Buscar película..."
                    aria-label="Buscar película por nombre"
                    className="w-full pl-12 pr-4 py-2 rounded-lg border border-[#444] text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                    onChange={handleChangeSearchMovieByName}
                />
                <Search aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
            </form>
        </header>
    );
};