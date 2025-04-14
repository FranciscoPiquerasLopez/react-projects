import { Search } from 'lucide-react';

export default function HeaderFilms() {
    return (
        <header className="mt-3 h-14 flex justify-center items-center px-6">
            <div className="relative w-full max-w-xl">
                <input
                    type="text"
                    name="buscar"
                    id="buscar"
                    placeholder="Buscar película..."
                    className="w-full pl-12 pr-4 py-2 rounded-lg border border-[#444] text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
            </div>
        </header>
    );
};