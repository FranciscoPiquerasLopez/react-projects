import debounce from "debounce";
import { useGlobalStore } from "../hooks/states/useGlobalStore";
import { transformationsLines, transformationWords } from "../utils/markdownPatterns";

export default function MarkdownPanel({ div1 }: { div1: React.RefObject<HTMLDivElement | null> }) {
    const setMarkdownText = useGlobalStore((state) => state.setMarkdownText);
    const setHtmlText = useGlobalStore((state) => state.setHtmlText);

    // Checkeamos todos los patrones para verificar si el markdown no tiene errores de sintaxis
    const parseMarkdownLines = (markdownText: string): string => {
        return markdownText
            .split("\n")
            .map(line => {
                for (const transform of transformationsLines) {
                    const newLine = transform(line);
                    if (newLine !== line) return newLine;
                }
                return line;
            })
            .join("\n");
    };

    const parseMarkdownWords = (markdownText: string): string => {
        return markdownText
            .split(" ")
            .map(word => {
                for (const transform of transformationWords) {
                    const newWord = transform(word);
                    if (newWord !== word) return newWord;
                }
                return word;
            })
            .join(" ");
    };

    // Uso de Debounce para mejorar rendimiento y evitar renders innecesarios
    const handleChange = debounce((markdownValue: string) => {
        setMarkdownText(markdownValue);
        const markdownParsedInLines = parseMarkdownLines(markdownValue);
        const markdownParsedWords = parseMarkdownWords(markdownParsedInLines);
        setHtmlText(markdownParsedWords);
    }, 300);

    return (
        <>
            <div ref={div1} className='flex w-full flex-col gap-2 bg-white rounded-2xl'>
                <h2 className='text-center mt-3 font-bold text-lg'>Markdown</h2>
                <textarea
                    name="markdown"
                    id="markdown"
                    className='h-full w-full focus:outline-none resize-none p-4'
                    onChange={(e) => { handleChange(e.target.value) }}>
                </textarea>
            </div>
        </>
    );
}