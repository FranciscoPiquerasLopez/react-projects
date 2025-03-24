import IntroductionSection from "./IntroductionSection";

const IntroductionContent = () => {
    return (
        <div className="introduction__content">
            <IntroductionSection idSection="markdown" titleSection={"Qué es markdown"}>
                <p>
                    Markdown es un lenguaje de marcado ligero que se usa para dar formato a texto de forma sencilla
                    y rápida sin necesidad de HTML. Sus casos de uso son:
                </p>
                <p>
                    1. Documentación y Readme (README.md) como GitHub.
                </p>
                <p>
                    2. Blogs y artículos que soportan Markdown.
                </p>
                <p>
                    3. Notas y apuntes en aplicaciones como Notion, Obsidian y más.
                </p>
                <p>
                    4. Emails y chats que admiten Markdown.
                </p>
                <p>
                    5. Publicación de libros y PDFs.
                </p>
            </IntroductionSection>
            <IntroductionSection idSection="encabezados" titleSection={"Encabezados"}>
                <p>
                    Para crear un encabezado, agrega entre uno y seis símbolos <code>#</code> antes del encabezado del texto.
                    El número de <code>#</code> que utilices determinará el nivel jerárquico y el tamaño tipográfico del encabezado.
                </p>
                <pre>
                    <code>
                        <p># Primer nivel</p>
                        <p>## Segundo nivel</p>
                        <p>### Tercer nivel</p>
                    </code>
                </pre>
            </IntroductionSection>
            <IntroductionSection idSection="estilosTexto" titleSection={"Estilos de texto"}>
                <p>
                    Puedes indicar énfasis con texto en negrita, cursiva, tachado, o de subíndice o superíndice en los campos
                    de comentarios y archivos .md.
                </p>
                <p>
                    <table className="tabla__estilos__markdown">
                        <thead>
                            <tr>
                                <th>Estilo</th>
                                <th>Sintaxis</th>
                                <th>Ejemplo</th>
                                <th>Resultados</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Negrita</strong></td>
                                <td><code>&lt;strong&gt; &lt;/strong&gt;</code></td>
                                <td><code>&lt;strong&gt;Este es un texto en negrita&lt;/strong&gt;</code></td>
                                <td><strong>Este es un texto en negrita.</strong></td>
                            </tr>
                            <tr>
                                <td><em>Cursiva</em></td>
                                <td><code>&lt;em&gt; &lt;/em&gt;</code></td>
                                <td><code>&lt;em&gt;Este texto está en cursiva&lt;/em&gt;</code></td>
                                <td><em>Este texto está en cursiva.</em></td>
                            </tr>
                            <tr>
                                <td><del>Tachado</del></td>
                                <td><code>&lt;del&gt; &lt;/del&gt;</code></td>
                                <td><code>&lt;del&gt;Este texto está equivocado&lt;/del&gt;</code></td>
                                <td><del>Este texto está equivocado</del></td>
                            </tr>
                            <tr>
                                <td><strong>Cursiva + Negrita</strong></td>
                                <td><code>&lt;strong&gt; &lt;/strong&gt; y &lt;em&gt; &lt;/em&gt;</code></td>
                                <td><code>&lt;strong&gt;Este texto es &lt;em&gt;extremadamente&lt;/em&gt; importante&lt;/strong&gt;</code></td>
                                <td><strong>Este texto es <em>extremadamente</em> importante</strong></td>
                            </tr>
                            <tr>
                                <td><em>Negrita y Cursiva total</em></td>
                                <td><code>&lt;strong&gt; &lt;/strong&gt; y &lt;em&gt; &lt;/em&gt;</code></td>
                                <td><code>&lt;strong&gt;&lt;em&gt;Todo este texto es importante&lt;/em&gt;&lt;/strong&gt;</code></td>
                                <td><strong><em>Todo este texto es importante</em></strong></td>
                            </tr>
                            <tr>
                                <td>Subíndice</td>
                                <td><code>&lt;sub&gt; &lt;/sub&gt;</code></td>
                                <td><code>Este es un &lt;sub&gt;subíndice&lt;/sub&gt;</code></td>
                                <td>Este es un <sub>subíndice</sub></td>
                            </tr>
                            <tr>
                                <td>Superíndice</td>
                                <td><code>&lt;sup&gt; &lt;/sup&gt;</code></td>
                                <td><code>Este es un &lt;sup&gt;superíndice&lt;/sup&gt;</code></td>
                                <td>Este es un <sup>superíndice</sup></td>
                            </tr>
                            <tr>
                                <td>Subrayado</td>
                                <td><code>&lt;ins&gt; &lt;/ins&gt;</code></td>
                                <td><code>Este es un &lt;ins&gt;texto subrayado&lt;/ins&gt;</code></td>
                                <td>Este es un <ins>texto subrayado</ins></td>
                            </tr>
                        </tbody>
                    </table>
                </p>
            </IntroductionSection>
            <IntroductionSection idSection="blockquote" titleSection={"Encabezados"}>
                <p>
                    Puede entrecomillar texto con <code><kbd>&gt;</kbd></code>.
                </p>
                <pre>
                    <code>
                        <p>Text that is not a quote</p>
                        <blockquote><p>Text that is a quote</p></blockquote>
                    </code>
                </pre>
            </IntroductionSection>
            <IntroductionSection idSection="code" titleSection="Código de cita">
                <p>
                    Puedes procesar un código en línea o en bloque. Para el código en línea es usando las comillas invertidas
                    <code>`</code>.
                </p>
                <p>
                    <code>Línea de código</code>
                </p>
                <p>
                    Para los bloques de código es metiendo el contenido entre tres comillas invertidas <code>```</code>
                </p>
                <pre>
                    <code>
                        <p>Primero</p>
                        <p>Segundo</p>
                        <p>Tercero</p>
                    </code>
                </pre>
            </IntroductionSection>
            <IntroductionSection idSection="enlaces" titleSection="Enlaces">
                <p>
                    Para insertar enlace sin título:
                </p>
                <p>
                    <code>[Google](https://www.google.com)</code>
                </p>
                <p>
                    Para insertar enlace con título:
                </p>
                <p>
                    <code>[Google](https://www.google.com "Haz clic para ir a Google")</code>
                </p>
            </IntroductionSection>
            <IntroductionSection idSection="saltos" titleSection="Saltos de línea">
                <p>
                    Los saltos de línea se generarán automáticamente tras nosotros hacer un salto de línea en cualquier parte
                    del texto.
                </p>
            </IntroductionSection>
            <IntroductionSection idSection="imagenes" titleSection="Imágenes">
                <p>
                    Sintaxis básica para insertar imágeges:
                </p>
                <p>
                    <code>
                        ![Logo de Google](https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png)
                    </code>
                </p>
                <p>
                    Imagen con título (al pasar el ratón):
                </p>
                <p>
                    <code>
                        ![Logo de Google](https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png "Haz clic para ir a Google")
                    </code>
                </p>
            </IntroductionSection>
            <IntroductionSection idSection="listas" titleSection="Listas">
                <p>
                    Para listas desordenadas basta con colocar <code>-</code>,<code>*</code> o <code>+</code> antes de una o más líneas de texto:
                </p>
                <pre>
                    <code>
                        <p>- George</p>
                        <p>* John Adams</p>
                        <p>+ Thomas Jefferson</p>
                    </code>
                </pre>
                <p>
                    Para las listas desordenadas, antecede cada línea con un número:
                </p>
                <pre>
                    <code>
                        <p>1. George</p>
                        <p>2. John Adams</p>
                        <p>3. Thomas Jefferson</p>
                    </code>
                </pre>
            </IntroductionSection>
            <IntroductionSection idSection="listasTareas" titleSection="Listas de tareas">
                <p>
                    Para crear una lista de tareas, debe añadir como prefijo un guion y espacio,
                    seguido de <code>[ ]</code> a los elementos de la lista. Para marcar una tarea como completada,
                    use <code>[x]</code>.
                </p>
                <pre>
                    <code>
                        <p>- [x] #739</p>
                        <p>- [ ] https://github.com/octo-org/octo-repo/issues/740</p>
                        <p>- [ ] Add delight to the experience when all tasks are complete :tada:</p>
                    </code>
                </pre>
            </IntroductionSection>
            <IntroductionSection idSection="tablas" titleSection="Tablas">
                <p>
                    En Markdown, las tablas se crean de una manera bastante simple usando pipes <code>(|)</code>
                    para separar las columnas y guiones <code>(-)</code> para crear la fila de encabezado.
                </p>
                <pre>
                    <code>
                        <p>| Encabezado 1 | Encabezado 2 | Encabezado 3 |</p>
                        <p>|--------------|--------------|--------------|</p>
                        <p>| Fila 1, Col 1| Fila 1, Col 2| Fila 1, Col 3|</p>
                        <p>| Fila 2, Col 1| Fila 2, Col 2| Fila 2, Col 3|</p>
                    </code>
                </pre>
            </IntroductionSection>
        </div>
    );
}

export default IntroductionContent;