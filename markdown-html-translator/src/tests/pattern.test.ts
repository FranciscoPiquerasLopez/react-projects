import { describe, test, expect } from "vitest";
import { transformationsLines, transformationWords, parseCodeLinesAndBlocks, parseTables, parseMarkdownParagraphs } from "../utils/markdownPatterns";

describe('Testing line patterns', () => {
    test('Parser to header <h1>', () => {
        const markdown = "# Encabezado 1";
        const output = transformationsLines[0](markdown);
        expect(output).toBe("<h1>Encabezado 1</h1>");
    });
    test('Parser to header <h2>', () => {
        const markdown = "## Encabezado 2";
        const output = transformationsLines[0](markdown);
        expect(output).toBe("<h2>Encabezado 2</h2>");
    });
    test('Parser to header <h3>', () => {
        const markdown = "### Encabezado 3";
        const output = transformationsLines[0](markdown);
        expect(output).toBe("<h3>Encabezado 3</h3>");
    });
    test('Parser to header <h4>', () => {
        const markdown = "#### Encabezado 4";
        const output = transformationsLines[0](markdown);
        expect(output).toBe("<h4>Encabezado 4</h4>");
    });
    test('Parser to header <h5>', () => {
        const markdown = "##### Encabezado 5";
        const output = transformationsLines[0](markdown);
        expect(output).toBe("<h5>Encabezado 5</h5>");
    });
    test('Parser to header <h6>', () => {
        const markdown = "###### Encabezado 6";
        const output = transformationsLines[0](markdown);
        expect(output).toBe("<h6>Encabezado 6</h6>");
    });
    test('Parser to header full line <hr> with ---', () => {
        const markdown = "---";
        const output = transformationsLines[0](markdown);
        expect(output).toBe("<hr>");
    });
    test('Parser to header full line <hr> with ___', () => {
        const markdown = "___";
        const output = transformationsLines[0](markdown);
        expect(output).toBe("<hr>");
    });
    test('Parser to header full line <hr> with ***', () => {
        const markdown = "***";
        const output = transformationsLines[0](markdown);
        expect(output).toBe("<hr>");
    });
});

describe('Testing word patterns', () => {
    test('Parser to strikethrough', () => {
        const markdown = "~~Texto tachado~~";
        const output = transformationWords[0].pattern.test(markdown);
        expect(output).toBe(true);
    });
    test('Parser to super superscript', () => {
        const markdown = "^Superindice^";
        const output = transformationWords[1].pattern.test(markdown);
        expect(output).toBe(true);
    });
    test('Parser to super subscript', () => {
        const markdown = "~Subindice~";
        const output = transformationWords[2].pattern.test(markdown);
        expect(output).toBe(true);
    });
    test('Parser to bold and cursive', () => {
        const markdown = "***Negrita y Cursiva***";
        const output = transformationWords[3].pattern.test(markdown);
        expect(output).toBe(true);
    });
    test('Parser bold with **', () => {
        const markdown = "**Negrita**";
        const output = transformationWords[4].pattern.test(markdown);
        expect(output).toBe(true);
    });
    test('Parser bold with __', () => {
        const markdown = "__Negrita__";
        const output = transformationWords[5].pattern.test(markdown);
        expect(output).toBe(true);
    });
    test('Parser cursive with *', () => {
        const markdown = "*Cursiva*";
        const output = transformationWords[6].pattern.test(markdown);
        expect(output).toBe(true);
    });
    test('Parser cursive with _', () => {
        const markdown = "_Cursiva_";
        const output = transformationWords[7].pattern.test(markdown);
        expect(output).toBe(true);
    });
    test('Parser underline', () => {
        const markdown = "++Subrayado++";
        const output = transformationWords[8].pattern.test(markdown);
        expect(output).toBe(true);
    });
});

describe('Testing code and code block patterns', () => {
    test('Parser code lines', () => {
        const markdown = "`Código en línea`";
        const output = parseCodeLinesAndBlocks(markdown);
        expect(output).toBe("<code>Código en línea</code>");
    });
    test('Parser code blocks', () => {
        const markdown = "```<p>Código de bloque</p><p>Código de bloque</p><p>Código de bloque</p>```";
        const output = parseCodeLinesAndBlocks(markdown);
        expect(output).toBe("<pre><code><p>Código de bloque</p><p>Código de bloque</p><p>Código de bloque</p></code></pre>");
    });
});

describe('Testing table pattern', () => {
    test('Parser table', () => {
        const markdown = "| Nombre  | Edad | Ciudad     ||---------|------|-----------|| Juan    | 25   | Madrid    || Ana     | 30   | Barcelona || Pedro   | 28   | Valencia  |";
        const output = parseTables(markdown);
        expect(output).toBe("<table><thead><tr><th>Nombre</th><th>Edad</th><th>Ciudad</th></tr></thead><tbody><tr><td>Juan</td><td>25</td><td>Madrid</td></tr><tr><td>Ana</td><td>30</td><td>Barcelona</td></tr><tr><td>Pedro</td><td>28</td><td>Valencia</td></tr></tbody></table>");
    });
});

describe('Testing paragraph patterns', () => {
    test('Parser unordered list', () => {
        const markdown = "- Hola";
        const output = parseMarkdownParagraphs(markdown);
        expect(output).toBe("<ul><li>Hola</li></ul>");
    });
    test('Parser ordered list', () => {
        const markdown = "1. Hola";
        const output = parseMarkdownParagraphs(markdown);
        expect(output).toBe("<ol><li>Hola</li></ol>");
    });
    test('Parser link', () => {
        const markdown = "[Google](https://www.google.com)";
        const output = parseMarkdownParagraphs(markdown);
        expect(output).toBe('<p><a href="https://www.google.com">Google</a></p>');
    });
    test('Parser task list no checked', () => {
        const markdown = "- [ ] Tarea pendiente";
        const output = parseMarkdownParagraphs(markdown);
        expect(output).toBe('<ul><li><input type="checkbox" disabled > Tarea pendiente</li></ul>');
    });
    test('Parser task list checked', () => {
        const markdown = "- [x] Tarea pendiente";
        const output = parseMarkdownParagraphs(markdown);
        expect(output).toBe('<ul><li><input type="checkbox" disabled checked> Tarea pendiente</li></ul>');
    });
    test('Parser quote', () => {
        const markdown = "> Hola";
        const output = parseMarkdownParagraphs(markdown);
        expect(output).toBe('<blockquote><p>Hola</p></blockquote>');
    });
    test('Paragraph <p>', () => {
        const markdown = "Hola";
        const output = parseMarkdownParagraphs(markdown);
        expect(output).toBe('<p>Hola</p>');
    });
});