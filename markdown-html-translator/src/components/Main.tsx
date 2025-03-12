import useSplitter from "../hooks/useSplitter";
import HtmlPanel from "./HtmlPanel";
import MarkdownPanel from "./MarkdownPanel";

export default function Main() {
    const { div1, div2, container, handleDown } = useSplitter();

    return (
        <>
            <main className='flex flex-col gap-14 justify-center items-center'>
                <h1 className='text-6xl text-center font-medium text-amber-50'>
                    Traductor de
                    <span className='block bg-gradient-to-r from-neutral-50 via-slate-500 to-neutral-50
            bg-clip-text text-transparent leading-16'>Markdown a HTML</span>
                </h1>
                <div ref={container} className='flex justify-around w-full h-3/5 rounded-2xl'>
                    <MarkdownPanel div1={div1} />
                    <div
                        className='w-1.5 min-w-1.5 cursor-col-resize bg-black hover:bg-gray-400'
                        onMouseDown={handleDown}
                    ></div>
                    <HtmlPanel div2={div2} />
                </div>
            </main>
        </>
    );
}