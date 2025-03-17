import useSplitter from "../hooks/useSplitter";
import HtmlPanel from "./HtmlPanel";
import MarkdownPanel from "./MarkdownPanel";

export default function Main() {
    const { div1, div2, container, handleDown } = useSplitter();

    return (
        <>
            <main>
                <h1 className="main__title">
                    Traductor de <span className="title__subtitle">Markdown a HTML</span>
                </h1>
                <div ref={container} className="main__panel">
                    <MarkdownPanel div1={div1} />
                    <div onMouseDown={handleDown} className="panel__slider panel__slider--hover"></div>
                    <HtmlPanel div2={div2} />
                </div>
            </main>
        </>
    );
}