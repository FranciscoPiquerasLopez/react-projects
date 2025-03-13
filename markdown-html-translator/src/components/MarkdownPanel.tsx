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

    const parseMarkdownParagraphs = (markdownText: string): string => {
        const linesMarkdown = markdownText.split("\n");
        let currentBlockType = "";
        let output = "";

        const openBlock = (typeBlock: string) => {
            if (typeBlock === "unorderedList") {
                if (currentBlockType !== "ul") { // Entra cuando no es ul
                    closeBlock();
                    output += "<ul>";
                    currentBlockType = "ul";
                }
            } else if (typeBlock === "orderedList") {
                if (currentBlockType !== "ol") { // Entra cuando no es ol
                    closeBlock();
                    output += "<ol>";
                    currentBlockType = "ol";
                }
            } else if (typeBlock === "link") {
                if (currentBlockType !== "p") {
                    closeBlock();
                    output += "<p>";
                    currentBlockType = "p";
                }
            } else if (typeBlock === "image") {
                if (currentBlockType !== "pimage") {
                    closeBlock();
                    output += "<p>";
                    currentBlockType = "pimage";
                }
            }
        };

        const closeBlock = () => {
            if (currentBlockType === "ul") output += "</ul>";
            else if (currentBlockType === "ol") {
                output += "</ol>";
                currentBlockType = "";
            } else if (currentBlockType === "p") {
                output += "</p>";
                currentBlockType = "";
            } else if (currentBlockType === "pimage") {
                output += "</p>";
                currentBlockType = "";
            }
        };

        linesMarkdown.forEach(line => {
            if (/^[-+*]\s+(.*)$/.test(line)) { // Regex para listas desordenadas
                openBlock("unorderedList");
                output += `<li>${line.replace(/^[-+*]\s+/, "")}</li>`;
            } else if (/^\d+\.\s+(.*)$/.test(line)) { // Regex para listas ordenadas
                openBlock("orderedList");
                output += `<li>${line.replace(/^\d+\.\s+/, "")}</li>`;
            } else if (/\[(.*?)\]\((https?:\/\/[^\s)]+)(?:\s+"(.*?)")?\)/.test(line)) { // Regex para los enlaces
                openBlock("link");
                output += line.replace(/\[(.*?)\]\((https?:\/\/[^\s)]+)(?:\s+"(.*?)")?\)/g, (_match, text, url, title) => {
                    return `<a href="${url}"${title ? ` title="${title}"` : ""}>${text}</a>`;
                });
            } else if (/<img\s+src="(.*?)"\s+alt="(.*?)"\s*\/?>/.test(line)) {
                openBlock("image");
                output += line.replace(/<img\s+src="(.*?)"\s+alt="(.*?)"\s*\/?>/g, (_match, url, alt) => {
                    return `<img src="${url}" ${alt ? ` alt="${alt}"` : ""} />`;
                });
            } else {
                closeBlock();
                output += line;
            }
        });

        closeBlock();

        return output;
    };


    // Uso de Debounce para mejorar rendimiento y evitar renders innecesarios
    const handleChange = debounce((markdownValue: string) => {
        setMarkdownText(markdownValue);
        const markdownParsedInLines = parseMarkdownLines(markdownValue);
        const markdownParsedWords = parseMarkdownWords(markdownParsedInLines);
        const markdownParsedParagraphs = parseMarkdownParagraphs(markdownParsedWords);
        setHtmlText(markdownParsedParagraphs);
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