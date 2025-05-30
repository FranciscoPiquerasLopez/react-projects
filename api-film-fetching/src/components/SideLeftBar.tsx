import useMoviesStore from "../store/useMoviesStore";

export default function SideLeftBar() {

    const section = useMoviesStore((state) => state.section);
    const setSection = useMoviesStore((state) => state.setSection);

    return (
        <div
            aria-label="Menú de navegación de películas"
            role="navigation"
            className="bg-[#1d1d20] py-5 hidden md:block w-[250px]"
        >
            <ul role="list">
                <li
                    role="button"
                    aria-pressed={section === "peliculasPopulares"}
                    onClick={() => setSection("peliculasPopulares")}
                    className={"cursor-pointer py-2 text-center " + (section === "peliculasPopulares" ? "bg-[#2B2B31] text-red-400 font-bold" : "")}>
                    Películas populares
                </li>
                <li
                    role="button"
                    aria-pressed={section === "peliculasCartelera"}
                    onClick={() => setSection("peliculasCartelera")}
                    className={"cursor-pointer py-2 text-center " + (section === "peliculasCartelera" ? "bg-[#2B2B31] text-red-400 font-bold" : "")}>
                    Películas en cartelera
                </li>
                <li
                    role="button"
                    aria-pressed={section === "proximosEstrenos"}
                    onClick={() => setSection("proximosEstrenos")}
                    className={"cursor-pointer py-2 text-center " + (section === "proximosEstrenos" ? "bg-[#2B2B31] text-red-400 font-bold" : "")}>
                    Próximos estrenos
                </li>
                <li
                    role="button"
                    aria-pressed={section === "peliculasFavoritas"}
                    onClick={() => setSection("peliculasFavoritas")}
                    className={"text-center py-2 cursor-pointer border-t-1 border-[#969696]" + (section === "peliculasFavoritas" ? "bg-[#2B2B31] text-red-400 font-bold" : "")}>
                    Películas favoritas
                </li>
            </ul>
        </div>
    );
};