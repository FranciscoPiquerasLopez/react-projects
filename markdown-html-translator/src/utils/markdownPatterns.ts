// Patrones para verificar el formato Markdown y verificar errores
interface PatternType {
    pattern: RegExp;
    replacement: string;
};

const applyPatternsInLine = (lineMarkdown: string, patterns: PatternType[]): string => {
    for (const { pattern, replacement } of patterns) {
        if (pattern.test(lineMarkdown)) {
            return lineMarkdown.replace(pattern, replacement);
        }
    }
    return lineMarkdown;
};

export const transformationsLines = [
    (line: string) => applyPatternsInLine(line, [
        { pattern: /^# (.*)$/, replacement: "<h1>$1</h1>" },
        { pattern: /^## (.*)$/, replacement: "<h2>$1</h2>" },
        { pattern: /^### (.*)$/, replacement: "<h3>$1</h3>" },
        { pattern: /^#### (.*)$/, replacement: "<h4>$1</h4>" },
        { pattern: /^##### (.*)$/, replacement: "<h5>$1</h5>" },
        { pattern: /^###### (.*)$/, replacement: "<h6>$1</h6>" },
        { pattern: /^([-_*])\1{2,}$/, replacement: "<hr>" }
    ])
];

export const transformationWords = [
    // ~~ Tachado ~~
    { pattern: /~~(.*?)~~/g, replacement: "<del>$1</del>" },

    // Primero, procesamos el superíndice
    { pattern: /\^([\s\S]+?)\^/g, replacement: "<sup>$1</sup>" },

    // Luego, procesamos el subíndice
    { pattern: /~([\s\S]+?)~/g, replacement: "<sub>$1</sub>" },

    // *** Negrita y cursiva anidada ***
    { pattern: /(\*\*\*)([\s\S]*?)(\*\*\*)/g, replacement: "<b><i>$2</i></b>" },

    // ** Negrita **
    { pattern: /\*\*(.*?)\*\*/g, replacement: "<b>$1</b>" },

    // __ Negrita con guiones bajos
    { pattern: /__(.*?)__/g, replacement: "<b>$1</b>" },

    // * Cursiva *
    { pattern: /\*(.*?)\*/g, replacement: "<i>$1</i>" },

    // _ Cursiva con guion bajo
    { pattern: /_(.*?)_/g, replacement: "<i>$1</i>" },

    // ++ subrayado ++
    { pattern: /\+\+([\s\S]+?)\+\+/g, replacement: "<u>$1</u>" },
];

export const parseCodeLinesAndBlocks = (markdownText: string) => {
    // Primero, procesamos los bloques de código (delimitados por tres backticks)
    let parsedText = markdownText.replace(/```([\s\S]+?)```/g, (_match, codeBlock) => {
        return `<pre><code>${codeBlock.trim()}</code></pre>`;
    });

    // Luego, procesamos el código en línea (delimitado por un solo backtick)
    parsedText = parsedText.replace(/`([^`]+)`/g, (_match, inlineCode) => {
        return `<code>${inlineCode}</code>`;
    });

    return parsedText;
};

export const parseTables = (markdownText: string) => {
    return markdownText.replace(/\|(.+?)\|\|[-|]+\|(.*?)\|(?=<|$)/gm, (_match, headerContent: string, bodyContent: string) => {
        // Procesar encabezados
        const theadContent = headerContent.split("|").map(cell => `<th>${cell.trim()}</th>`).join("");

        // Procesar filas de la tabla
        const rowsSplitted = bodyContent.split("||").filter(row => row.trim() !== "");
        const tbodyContent = rowsSplitted.map(row => {
            return `<tr>${row.split("|").map(cell => `<td>${cell.trim()}</td>`).join("")}</tr>`;
        }).join("");

        return `<table><thead><tr>${theadContent}</tr></thead><tbody>${tbodyContent}</tbody></table>`;
    });
};

// Checkeamos todos los patrones para verificar si el markdown no tiene errores de sintaxis
export const parseMarkdownLines = (markdownText: string): string => {
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

export const parseMarkdownWords = (markdownText: string): string => {
    let resultText = markdownText;

    for (const transform of transformationWords) {
        resultText = resultText.replace(transform.pattern, transform.replacement);
    }

    return resultText;
};

export const parseMarkdownParagraphs = (markdownText: string): string => {
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
            if (!/<h([1-6])[^>]*>/.test(line) && !/^<hr>/.test(line) && !/```/.test(line) && !/^\|/.test(line) && line !== "") {
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