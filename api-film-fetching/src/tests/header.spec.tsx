import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import debounce from "../utils/debounce";
import useMoviesStore from '../store/useMoviesStore';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import HeaderFilms from '../components/HeaderFilms';

// Test de la función debounceSetMovieName
describe('debounceSetMovieName', () => {

    beforeEach(() => {
        vi.useFakeTimers(); // Activar fake timers antes de cada test para decirle a vitest que vamos a usar timers falsos
    });

    afterEach(() => {
        vi.useRealTimers(); // Limpia los timers después de cada test
    });

    it('debe llamar setMovieName después de 500 ms', () => {
        // Mock de la función setMovieName
        const setMovieNameMock = vi.fn();
        const debounceSetMovieName = debounce((value: string) => setMovieNameMock(value), 500);

        debounceSetMovieName('movie 1');

        // No se llama instantaneamente
        expect(setMovieNameMock).not.toHaveBeenCalled();

        // Verificar que se llame a los 500 ms
        vi.advanceTimersByTime(500);
        expect(setMovieNameMock).toHaveBeenCalledWith('movie 1');
    });
});

// Test de la interfaz del componente Header
describe('HeaderFilms', () => {

    beforeEach(() => {
        // Reseteamos state antes de cada test para evitar interferencias
        useMoviesStore.setState({ movieName: "" });
    });

    it('Estado inicial de movieName vacío', () => {
        const movieNameValue = useMoviesStore.getState().movieName;
        expect(movieNameValue).toEqual("");
    });

    it('debe mostrar el input de búsqueda', () => {
        render(<input placeholder="Buscar película..." />);

        const input = screen.getByPlaceholderText('Buscar película...');
        expect(input).toBeInTheDocument();
    });

    it('disparar evento onChange y setear estado de movieName en el Store de Zustand', async () => {
        render(<HeaderFilms />);

        const input = screen.getByPlaceholderText("Buscar película...");

        // Disparamos evento del input con fireEvent
        fireEvent.change(input, { target: { value: "Vengadores" } });

        await waitFor(() => {
            const movieName = useMoviesStore.getState().movieName;
            expect(movieName).toEqual("Vengadores");
        });
    });
});