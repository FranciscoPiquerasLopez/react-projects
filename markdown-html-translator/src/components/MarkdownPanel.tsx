import debounce from "debounce";
import { useGlobalStore } from "../hooks/states/useGlobalStore";
import { parseCodeLinesAndBlocks, transformationsLines, transformationWords } from "../utils/markdownPatterns";

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
        let resultText = markdownText;

        for (const transform of transformationWords) {
            resultText = resultText.replace(transform.pattern, transform.replacement);
        }

        return resultText;
    };

    const parseMarkdownParagraphs = (markdownText: string): string => {
        const linesMarkdown = markdownText.split("\n");
        let currentBlockType = "";
        let output = "";

        const openBlock = (typeBlock: string) => {
            if (typeBlock === "unorderedList") {
                if (currentBlockType !== "ul") {
                    closeBlock();
                    output += "<ul>";
                    currentBlockType = "ul";
                }
            } else if (typeBlock === "orderedList") {
                if (currentBlockType !== "ol") {
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
            } else if (typeBlock === "task") {
                if (currentBlockType !== "ultask") {
                    closeBlock();
                    output += "<ul>";
                    currentBlockType = "ultask";
                }
            } else if (typeBlock === "quote") {
                if (currentBlockType !== "blockquote") {
                    closeBlock();
                    output += "<blockquote>";
                    currentBlockType = "blockquote";
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
            } else if (currentBlockType === "ultask") {
                output += "</ul>";
                currentBlockType = "";
            } else if (currentBlockType === "blockquote") {
                output += "</blockquote>";
                currentBlockType = "";
            }
        };

        linesMarkdown.forEach(line => {
            if (/^[-+*]\s+([^[].*)$/.test(line)) { // Regex para listas desordenadas
                openBlock("unorderedList");
                output += `<li>${line.replace(/^[-+*]\s+/, "")}</li>`;
            } else if (/^\d+\.\s+(.*)$/.test(line)) { // Regex para listas ordenadas
                openBlock("orderedList");
                output += `<li>${line.replace(/^\d+\.\s+/, "")}</li>`;
            } else if (/^!\[.*?\]\((https?:\/\/[^\s)]+)(?:\s+"(.*?)")?\)/.test(line)) { // Regex para imágenes
                openBlock("image");
                output += line.replace(/^!\[.*?\]\((https?:\/\/[^\s)]+)(?:\s+"(.*?)")?\)/g, (_match, url, alt, title) => {
                    return `<img src="${url}" alt="${alt} "${title ? ` title="${title}"` : ""} />`;
                });
            } else if (/\[(.*?)\]\((https?:\/\/[^\s)]+)(?:\s+"(.*?)")?\)/.test(line)) { // Regex para enlaces
                openBlock("link");
                output += line.replace(/\[(.*?)\]\((https?:\/\/[^\s)]+)(?:\s+"(.*?)")?\)/g, (_match, text, url, title) => {
                    return `<a href="${url}"${title ? ` title="${title}"` : ""}>${text}</a>`;
                });
            } else if (/^-\s+\[(x|X|\s*)\]\s+(.*?)$/.test(line)) { // Regex para la lista de tareas
                openBlock("task");
                output += line.replace(/^-\s+\[(x|X|\s*)\]\s+(.*?)$/g, (_match, checked, text) => {
                    const isChecked = (checked.trim().toLowerCase() === "x");
                    return `<li><input type="checkbox" disabled ${isChecked ? "checked" : ""}> ${text}</li>`;
                });
            } else if (/^>\s+(.*?)$/.test(line)) { // Regex para el blockquote
                openBlock("quote");
                output += `<p>${line.replace(/^>\s+/, "")}</p>`;
            } else { // Párrafo en cualquier otro caso
                closeBlock();
                if (!/<h([1-6])[^>]*>/.test(line) && !/^<hr>/.test(line) && !/```/.test(line) && line !== "") {
                    output += `<p>${line}</p>`;
                } else if (line === "") {
                    output += "</br>";
                } else {
                    output += line;
                }
            }
        });

        closeBlock();

        return output;
    };


    // Uso de Debounce para mejorar rendimiento y evitar renders innecesarios
    const handleChange = debounce((markdownValue: string) => {
        setMarkdownText(markdownValue);
        const markdownParsedInLines = parseMarkdownLines(markdownValue); // Parseamos líneas
        const markdownParsedWords = parseMarkdownWords(markdownParsedInLines); // Parseamos palabras
        const markdownParsedParagraphs = parseMarkdownParagraphs(markdownParsedWords); // Parseamos párrafos
        const markdownParsedCodeBlocks = parseCodeLinesAndBlocks(markdownParsedParagraphs); // Parseamos bloques de código
        setHtmlText(markdownParsedCodeBlocks);
    }, 300);

    return (
        <>
            <div ref={div1} className='panel__markdown'>
                <h2 className='panel__markdown__title'>Markdown</h2>
                <textarea
                    name="markdown"
                    id="markdown"
                    className='panel__markdown__textarea'
                    onChange={(e) => { handleChange(e.target.value) }}>
                </textarea>
            </div>
        </>
    );
}