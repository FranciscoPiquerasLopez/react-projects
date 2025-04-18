import { create } from "zustand";

type Store = {
    section: string
    visibleMovieInformation: boolean
    selectedMovieId: number
    movieName: string
    ratingMoviesFilter: number
    selectedGenreFilter: number
    setSection: (sectionArgument: string) => void
    setVisibleMovieInformation: () => void
    setSelectedMovieId: (movieId: number) => void
    setMovieName: (movieValueSearchInput: string) => void
    setRatingMoviesFilter: (ratingValue: number) => void
    setSelectedGenreFilter: (genreValue: number) => void
};

const useMoviesStore = create<Store>()((set) => ({
    section: "peliculasPopulares",
    visibleMovieInformation: false,
    selectedMovieId: 0,
    movieName: "",
    ratingMoviesFilter: 0,
    selectedGenreFilter: 0,
    setSection: (sectionArgument: string) => set({ section: sectionArgument }),
    setVisibleMovieInformation: () => set((state) => ({ visibleMovieInformation: !state.visibleMovieInformation })),
    setSelectedMovieId: (movieId: number) => set({ selectedMovieId: movieId }),
    setMovieName: (movieValueSearchInput: string) => set({ movieName: movieValueSearchInput }),
    setRatingMoviesFilter: (ratingValue: number) => set({ ratingMoviesFilter: ratingValue }),
    setSelectedGenreFilter: (genreValue: number) => set({ selectedGenreFilter: genreValue }),
}));

export default useMoviesStore;