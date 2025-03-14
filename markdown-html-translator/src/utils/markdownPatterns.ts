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

    // Detectar bloques de código multilínea y envolver en <pre><code>...</code></pre>
    { pattern: /```([\s\S]+?)```/g, replacement: "<pre><code>$1</code></pre>" },

    // ` Código en línea `
    { pattern: /`([^`]+)`/g, replacement: "<code>$1</code>" },

    // ++ subrayado ++
    { pattern: /\+\+([\s\S]+?)\+\+/g, replacement: "<u>$1</u>" },
];