import { create } from "zustand";

type Store = {
    section: string
    setSection: (sectionArgument: string) => void
};

const useMoviesStore = create<Store>()((set) => ({
    section: "peliculasPopulares",
    setSection: (sectionArgument: string) => set({ section: sectionArgument }),
}))

export default useMoviesStore;