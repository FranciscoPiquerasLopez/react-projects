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
    console.log(markdownText);
    return markdownText.replace(/\|(.+?)\|\|[-]+\|[-]+\|\|(.*?)\|(?=<|$)/gm, (_match, headerContent: string, bodyContent: string) => {
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