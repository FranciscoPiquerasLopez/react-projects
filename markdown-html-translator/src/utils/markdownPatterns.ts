// Patrones para verificar el formato Markdown y verificar errores

interface PatternType {
    pattern: RegExp;
    replacement: string;
    typePattern?: string;
};

interface ReturnPatternLine {
    lineMarkdown: string;
    typePattern: string;
}

const applyPatternsInLine = (lineMarkdown: string, patterns: PatternType[]): ReturnPatternLine | string => {
    for (const { pattern, replacement, typePattern } of patterns) {
        if (pattern.test(lineMarkdown)) {
            return { lineMarkdown: lineMarkdown.replace(pattern, replacement), typePattern: typePattern! };
        }
    }
    return lineMarkdown;
};

const applyPatternsToWords = (word: string, patterns: PatternType[]): string => {
    for (const { pattern, replacement } of patterns) {
        if (pattern.test(word)) {
            return word.replace(pattern, replacement);
        }
    }
    return word;
};

export const transformationsLines = [
    (line: string) => applyPatternsInLine(line, [
        { pattern: /^# (.*)$/, replacement: "<h1>$1</h1>" },
        { pattern: /^## (.*)$/, replacement: "<h2>$1</h2>" },
        { pattern: /^### (.*)$/, replacement: "<h3>$1</h3>" },
        { pattern: /^#### (.*)$/, replacement: "<h4>$1</h4>" },
        { pattern: /^##### (.*)$/, replacement: "<h5>$1</h5>" },
        { pattern: /^###### (.*)$/, replacement: "<h6>$1</h6>" }
    ]),
    (line: string) => applyPatternsInLine(line, [
        { pattern: /^([-_*])\1{2,}$/, replacement: "<hr>" }
    ])
];

export const transformationWords = [
    (word: string) => applyPatternsToWords(word, [
        { pattern: /\*\*(.+?)\*\*/g, replacement: "<strong>$1</strong>" },
        { pattern: /__(.+?)__/g, replacement: "<strong>$1</strong>" }
    ]),
    (word: string) => applyPatternsToWords(word, [
        { pattern: /\*(.+?)\*/g, replacement: "<em>$1</em>" },
        { pattern: /_(.+?)_/g, replacement: "<em>$1</em>" }
    ]),
    (word: string) => applyPatternsToWords(word, [
        { pattern: /`([^`]+)`/g, replacement: "<code>$1</code>" }
    ])
];