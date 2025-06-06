import { create, StateCreator } from "zustand";

interface MarkdownSlice {
    markdownText: string;
    setMarkdownText: (markdownValue: string) => void;
};

interface HtmlSlice {
    htmlText: string;
    setHtmlText: (htmlValue: string) => void;
};

interface ActiveSection {
    activeSection: string;
    setActiveSection: (newActiveSection: string) => void;
};

// Usamos StateCreator, ya que es un tipo genérico que se usar para tipar las funciones que crean slices
// en el estado. Permite definir que tipo de estado maneja e incluso qué middlewares usa y cómo se
// actualiza el estado
const createMarkdownSlice: StateCreator<MarkdownSlice, [], [], MarkdownSlice> = (..._args) => ({
    markdownText: "",
    setMarkdownText: (markdownValue: string) => _args[0]({ markdownText: markdownValue }),
});

const createHtmlSlice: StateCreator<HtmlSlice, [], [], HtmlSlice> = (..._args) => ({
    htmlText: "",
    setHtmlText: (htmlValue: string) => _args[0]({ htmlText: htmlValue })
});

const createActiveSectionSlice: StateCreator<ActiveSection, [], [], ActiveSection> = (..._args) => ({
    activeSection: "",
    setActiveSection: (newActiveSection: string) => _args[0]({ activeSection: newActiveSection })
});

export const useGlobalStore = create<MarkdownSlice & HtmlSlice & ActiveSection>()((set, get, store) => ({
    ...createMarkdownSlice(set, get, store),
    ...createHtmlSlice(set, get, store),
    ...createActiveSectionSlice(set, get, store),
}))