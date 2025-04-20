import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// 🎬 UI Slice
interface UiState {
    hamburgerMenuIsChecked: boolean;
    visibleMovieInformation: boolean;
    toggleHamburgerMenu: () => void;
    toggleMovieInformationVisibility: () => void;
};

// 🎥 Movie Slice
interface MovieState {
    section: string;
    selectedMovieId: number;
    movieName: string;
    ratingMoviesFilter: number;
    selectedGenreFilter: number;
    setSection: (section: string) => void;
    setSelectedMovieId: (id: number) => void;
    setMovieName: (name: string) => void;
    setRatingMoviesFilter: (rating: number) => void;
    setSelectedGenreFilter: (genre: number) => void;
};

// 📦 Global Store
type Store = UiState & MovieState;

// ✅ Create Store
const useMoviesStore = create<Store>()(
    devtools(
        persist(
            (set) => ({
                // UI state
                hamburgerMenuIsChecked: false,
                visibleMovieInformation: false,
                toggleHamburgerMenu: () =>
                    set((state) => ({
                        hamburgerMenuIsChecked: !state.hamburgerMenuIsChecked,
                    })),
                toggleMovieInformationVisibility: () =>
                    set((state) => ({
                        visibleMovieInformation: !state.visibleMovieInformation,
                    })),

                // Movie state
                section: "peliculasPopulares",
                selectedMovieId: 0,
                movieName: "",
                ratingMoviesFilter: 0,
                selectedGenreFilter: 0,
                setSection: (section) => set({ section }),
                setSelectedMovieId: (id) => set({ selectedMovieId: id }),
                setMovieName: (name) => set({ movieName: name }),
                setRatingMoviesFilter: (rating) => set({ ratingMoviesFilter: rating }),
                setSelectedGenreFilter: (genre) => set({ selectedGenreFilter: genre }),
            }),
            { name: "movies-storage" }
        )
    )
);

export default useMoviesStore;