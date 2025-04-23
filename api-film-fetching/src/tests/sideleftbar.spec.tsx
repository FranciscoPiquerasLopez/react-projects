import { beforeEach, describe, expect, it } from "vitest";
import SideLeftBar from "../components/SideLeftBar";
import useMoviesStore from "../store/useMoviesStore";
import { fireEvent, render, screen } from "@testing-library/react";

describe('Interfaz del menú de navegación para navegar entre secciones', () => {

    beforeEach(() => {
        render(<SideLeftBar />);
    });

    it('Sección de películas populares', () => {
        const section = screen.getByText('Películas populares');
        fireEvent.click(section);

        const activeSection = useMoviesStore.getState().section;
        expect(activeSection).toEqual("peliculasPopulares");
    });

    it('Sección de películas en cartelera', () => {
        const section = screen.getByText('Películas en cartelera');
        fireEvent.click(section);

        const activeSection = useMoviesStore.getState().section;
        expect(activeSection).toEqual("peliculasCartelera");
    });

    it('Sección de próximos estrenos', () => {
        const section = screen.getByText("Próximos estrenos");
        fireEvent.click(section);

        const activeSection = useMoviesStore.getState().section;
        expect(activeSection).toEqual("proximosEstrenos");
    });

    it('Sección de películas favoritas', () => {
        const section = screen.getByText("Películas favoritas");
        fireEvent.click(section);

        const activeSection = useMoviesStore.getState().section;
        expect(activeSection).toEqual("peliculasFavoritas");
    });
});