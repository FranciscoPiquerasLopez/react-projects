import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ContentMovies from "../components/ContentMovies";
import useMoviesStore from "../store/useMoviesStore";

describe('Interfaz de carga de películas', () => {

    // Mock del custom hook donde traigo las películas filtradas
    vi.mock('../hooks/useMovieFilters', () => ({
        useMovieFilters: () => ({
            filteredMovies: [
                {
                    "adult": false,
                    "backdrop_path": "/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg",
                    "genre_ids": [
                        28,
                        80,
                        53
                    ],
                    "id": 1197306,
                    "original_language": "en",
                    "original_title": "A Working Man",
                    "overview": "Levon Cade left behind a decorated military career in the black ops to live a simple life working construction. But when his boss's daughter, who is like family to him, is taken by human traffickers, his search to bring her home uncovers a world of corruption far greater than he ever could have imagined.",
                    "popularity": 1110.4627,
                    "poster_path": "/xUkUZ8eOnrOnnJAfusZUqKYZiDu.jpg",
                    "release_date": "2025-03-26",
                    "title": "A Working Man",
                    "video": false,
                    "vote_average": 6.279,
                    "vote_count": 356
                }
            ]
        })
    }));

    beforeEach(() => {
        useMoviesStore.getState().setSelectedMovieId(0)
    });

    it('Click en botón "Ver más" de cualquier película', () => {
        render(<ContentMovies />);

        const button = screen.getByText("Ver más");
        fireEvent.click(button);

        const selectedMovieId = useMoviesStore.getState().selectedMovieId;
        expect(selectedMovieId).toEqual(1197306);
    });
});