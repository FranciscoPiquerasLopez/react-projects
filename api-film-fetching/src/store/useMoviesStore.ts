import { create } from "zustand";

type Store = {
    section: string
    visibleMovieInformation: boolean
    selectedMovieId: number
    setSection: (sectionArgument: string) => void
    setVisibleMovieInformation: () => void
    setSelectedMovieId: (movieId: number) => void
};

const useMoviesStore = create<Store>()((set) => ({
    section: "peliculasPopulares",
    visibleMovieInformation: false,
    selectedMovieId: 0,
    setSection: (sectionArgument: string) => set({ section: sectionArgument }),
    setVisibleMovieInformation: () => set((state) => ({ visibleMovieInformation: !state.visibleMovieInformation })),
    setSelectedMovieId: (movieId: number) => set({ selectedMovieId: movieId }),
}))

export default useMoviesStore;