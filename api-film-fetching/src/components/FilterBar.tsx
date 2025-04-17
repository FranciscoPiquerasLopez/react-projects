import { ChangeEvent } from "react";
import useMoviesStore from "../store/useMoviesStore";
import { MovieGenresInterface } from "../interfaces/MovieGenresInterface";

export default function FilterBar({ genres }: { genres: MovieGenresInterface[] | undefined }) {

    const setRatingMoviesFilter = useMoviesStore((state) => state.setRatingMoviesFilter);
    const ratingMoviesFilter = useMoviesStore((state) => state.ratingMoviesFilter);
    const selectedGenreFilter = useMoviesStore((state) => state.selectedGenreFilter);
    const setSelectedGenreFilter = useMoviesStore((state) => state.setSelectedGenreFilter);

    const handleChangeRatingFilterMovies = (e: ChangeEvent<HTMLInputElement>) => {
        setRatingMoviesFilter(parseFloat(e.target.value));
    };

    const handleChangeSelectedGenre = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedGenreFilter(Number(value));
    };

    return (
        <div className="inline-flex bg-[#343438] py-2 px-4 mb-5 rounded-lg gap-x-15">
            {/** Slider para filtrar por puntuación */}
            <div className='flex justify-center gap-3'>
                <div className="flex items-center gap-3">
                    <label htmlFor="rating" className='text-sm'>Puntuación</label>
                    <input
                        type="range"
                        name="rating"
                        id="rating"
                        min={0}
                        max={10}
                        step={0.5}
                        value={ratingMoviesFilter}
                        onChange={handleChangeRatingFilterMovies}
                        className='w-32 h-1 bg-amber-500 rounded-lg appearance-none cursor-pointer'
                    />
                    <span className="w-8 text-sm text-center">{ratingMoviesFilter}</span>
                </div>
            </div>
            {/** Select para seleccionar el género */}
            <div className="flex justify-center items-center gap-x-2">
                <label htmlFor="countries" className="text-sm">Elegir género</label>
                {
                    <select
                        id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto py-1 px-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={handleChangeSelectedGenre}
                        value={selectedGenreFilter}
                    >
                        <option value={0}>Todos</option>
                        {
                            genres?.map((genre) => (
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                            ))
                        }
                    </select>
                }
            </div>
        </div>
    );
};