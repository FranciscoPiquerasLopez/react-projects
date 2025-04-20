import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import debounce from "../utils/debounce";
import { describe, expect, it, vi } from 'vitest';

// Mockeamos el store (tienda) de Zustand


// Test de la función debounceSetMovieName
describe('debounceSetMovieName', () => {
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
    it('debe mostrar el input de búsqueda', () => {

    });
});