import { create } from "zustand";
import { MovieInterface } from "../interfaces/MovieInterface";
import { persist } from "zustand/middleware";

interface FavoritesState {
    favorites: MovieInterface[];
    addFavorite: (movie: MovieInterface) => void;
    removeFavorite: (id: number) => void;
    clearFavorites: () => void;
};

const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set) => ({
            favorites: [],
            addFavorite: (movie) => set((state) => ({
                favorites: [...state.favorites, movie],
            })),
            removeFavorite: (id) => set((state) => ({
                favorites: state.favorites.filter(fav => fav.id !== id),
            })),
            clearFavorites: () => set({ favorites: [] }),
        }),
        {
            name: 'favorites-storage', // Nombre de la clave en localStorage
        }
    )
);

export default useFavoritesStore;