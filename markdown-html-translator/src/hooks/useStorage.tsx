import { useCallback } from "react";

const useStorage = (keyStorage: string, keyHtml: string) => {
    // Obtener el valor del storage del markdown
    const getMarkdownStorage = useCallback(() => {
        return localStorage.getItem("markdownStorage");
    }, []);

    // Guardar el valor en el storage del markdown
    const setMarkdownStorage = (value: string) => {
        localStorage.setItem(keyStorage, value);
    };

    // Obtener el valor del storage del html
    const getHtmlStorage = useCallback(() => {
        return localStorage.getItem("htmlStorage");
    }, []);

    // Guardar el valor en el storage del html
    const setHtmlStorage = (value: string) => {
        localStorage.setItem(keyHtml, value);
    }

    return { getMarkdownStorage, setMarkdownStorage, getHtmlStorage, setHtmlStorage };
};
export default useStorage;