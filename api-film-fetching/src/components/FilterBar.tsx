import { ChangeEvent } from "react";
import useMoviesStore from "../store/useMoviesStore";

export default function FilterBar() {

    const setRatingMoviesFilter = useMoviesStore((state) => state.setRatingMoviesFilter);
    const ratingMoviesFilter = useMoviesStore((state) => state.ratingMoviesFilter);

    const handleChangeRatingFilterMovies = (e: ChangeEvent<HTMLInputElement>) => {
        setRatingMoviesFilter(parseFloat(e.target.value));
    };

    return (
        <div className="inline-flex bg-[#343438] py-2 px-4 mb-5 rounded-lg">
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
        </div>
    );
};