export default function HeaderFilms() {
    return (
        <header className="h-14 flex justify-center items-center p-10">
            <input
                type="text"
                name="buscar"
                id="buscar"
                placeholder='Buscar...'
                className='pr-3 pl-3 border border-amber-50 pt-0.5 pb-0.5 w-[500px] text-[22px]' />
        </header>
    );
};