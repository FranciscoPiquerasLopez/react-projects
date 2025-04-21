import { beforeEach, describe, expect, it } from "vitest";
import useMoviesStore from "../store/useMoviesStore";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import FilterBar from "../components/FilterBar";

const genres = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
];

// Barra de filtrado
describe('Barra de filtrado de películas', () => {

    beforeEach(() => {
        useMoviesStore.setState(
            {
                ratingMoviesFilter: 0,
                selectedGenreFilter: 0
            }
        );

        // Renderizamos el componente antes de cada test
        render(<FilterBar genres={genres} />);
    });

    it('Renderiza el slider para filtrar por puntuación de película', () => {
        const slider = screen.getByRole("slider");
        expect(slider).toBeInTheDocument();
    });

    it('Renderiza el select para filtrar por género de película', () => {
        const select = screen.getByRole("combobox");
        expect(select).toBeInTheDocument();
    });

    it('Seteo de estado de Zustand con el event del slider', async () => {
        const slider = screen.getByRole("slider");
        fireEvent.change(slider, { target: { value: 1 } });

        await waitFor(() => {
            const ratingMoviesFilter = useMoviesStore.getState().ratingMoviesFilter;
            expect(ratingMoviesFilter).toEqual(1);
        });
    });

    it('Seteo de estado de Zustand con el event del select', async () => {
        const select = screen.getByRole("combobox");
        fireEvent.change(select, { target: { value: "28" } });

        await waitFor(() => {
            const selectedGenreFilter = useMoviesStore.getState().selectedGenreFilter;
            expect(selectedGenreFilter).toEqual(28);
        });
    });
});