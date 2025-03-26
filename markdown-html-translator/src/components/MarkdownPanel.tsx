import debounce from "debounce";
import { useGlobalStore } from "../hooks/states/useGlobalStore";
import { parseCodeLinesAndBlocks, parseMarkdownLines, parseMarkdownParagraphs, parseMarkdownWords, parseTables } from "../utils/markdownPatterns";
import { useEffect, useRef } from "react";
import useStorage from "../hooks/useStorage";

export default function MarkdownPanel({ div1 }: { div1: React.RefObject<HTMLDivElement | null> }) {
    const setMarkdownText = useGlobalStore((state) => state.setMarkdownText);
    const setHtmlText = useGlobalStore((state) => state.setHtmlText);

    // Custom hooks
    const { getMarkdownStorage, setMarkdownStorage, getHtmlStorage, setHtmlStorage } = useStorage("markdownStorage", "htmlStorage");

    // Refs a los elementos HTML
    const textareaMarkdown = useRef<HTMLTextAreaElement | null>(null);

    // useEffect para mantener la sincronización con el localStorage del navegador
    useEffect(() => {
        const markdownStorage = getMarkdownStorage();
        const htmlStorage = getHtmlStorage();

        if (markdownStorage !== null) {
            if (textareaMarkdown.current) {
                textareaMarkdown.current.value = markdownStorage;
            }
        }
        if (htmlStorage !== null) {
            setHtmlText(htmlStorage);
        }
    }, [getMarkdownStorage, getHtmlStorage, setHtmlText]);

    // Uso de Debounce para mejorar rendimiento y evitar renders innecesarios
    const handleChange = debounce((markdownValue: string) => {
        setMarkdownStorage(markdownValue);
        setMarkdownText(markdownValue);
        const markdownParsedInLines = parseMarkdownLines(markdownValue); // Parseamos líneas
        const markdownParsedWords = parseMarkdownWords(markdownParsedInLines); // Parseamos palabras
        const markdownParsedParagraphs = parseMarkdownParagraphs(markdownParsedWords); // Parseamos párrafos
        const markdownParsedCodeBlocks = parseCodeLinesAndBlocks(markdownParsedParagraphs); // Parseamos bloques de código
        const markdownParsedTables = parseTables(markdownParsedCodeBlocks);
        setHtmlStorage(markdownParsedTables);
        setHtmlText(markdownParsedTables);
    }, 300);

    return (
        <>
            <div ref={div1} className='panel__markdown'>
                <ul className="panel__html__navbar">
                    <li><button className="panel__html__navbar_elements">Markdown</button></li>
                </ul>
                <textarea
                    ref={textareaMarkdown}
                    name="markdown"
                    id="markdown"
                    className='panel__markdown__textarea'
                    onChange={(e) => { handleChange(e.target.value) }}>
                </textarea>
            </div>
        </>
    );
}