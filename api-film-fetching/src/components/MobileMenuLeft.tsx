import { Menu, X } from 'lucide-react';
import useMoviesStore from '../store/useMoviesStore';

export default function MobileMenuLeft() {

    // Zustand hamburger menu
    const hamburgerMenuIsChecked = useMoviesStore((state) => state.hamburgerMenuIsChecked);
    const setHamburgerMenu = useMoviesStore((state) => state.setHamburgerMenu);
    const setSection = useMoviesStore((state) => state.setSection);
    const section = useMoviesStore((state) => state.section);

    const handleClickHamburgerMenu = () => {
        setHamburgerMenu();
    };

    return (
        <>
            {/** Hamburger menu icon */}
            <button className='z-20 block md:hidden py-5 w-[50px]'>
                {
                    hamburgerMenuIsChecked
                        ? <X onClick={handleClickHamburgerMenu} className={`cursor-pointer absolute top-6 left-2 transition duration-500 ease-in-out ${hamburgerMenuIsChecked ? 'opacity-100' : 'opacity-0'}`} size={30} />
                        : <Menu onClick={handleClickHamburgerMenu} className={`cursor-pointer absolute top-6 left-2 transition duration-500 ease-in-out ${hamburgerMenuIsChecked ? 'opacity-0' : 'opacity-100'}`} size={30} />
                }
            </button>

            {/** Menú */}
            <div className={`pl-3 pt-15 absolute z-10 h-full top-0 left-0 w-full bg-[#000] text-white transition-transform duration-300 ease-in-out ${hamburgerMenuIsChecked ? 'transform translate-x-0' : '-translate-x-full'}`}>
                <ul>
                    <li
                        onClick={() => setSection("peliculasPopulares")}
                        className={"cursor-pointer py-2 text-start " + (section === "peliculasPopulares" ? "bg-[#2B2B31] text-red-400 font-bold" : "")}>
                        Películas populares
                    </li>
                    <li
                        onClick={() => setSection("peliculasCartelera")}
                        className={"cursor-pointer py-2 text-start " + (section === "peliculasCartelera" ? "bg-[#2B2B31] text-red-400 font-bold" : "")}>
                        Películas en cartelera
                    </li>
                    <li
                        onClick={() => setSection("proximosEstrenos")}
                        className={"cursor-pointer py-2 text-start " + (section === "proximosEstrenos" ? "bg-[#2B2B31] text-red-400 font-bold" : "")}>
                        Próximos estrenos
                    </li>
                    <li
                        onClick={() => setSection("peliculasFavoritas")}
                        className={"text-start py-2 cursor-pointer border-t-1 border-[#969696]" + (section === "peliculasFavoritas" ? "bg-[#2B2B31] text-red-400 font-bold" : "")}>
                        Películas favoritas
                    </li>
                </ul>
            </div>
        </>
    );
};