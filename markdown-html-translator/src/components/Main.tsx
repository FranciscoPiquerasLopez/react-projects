import useSplitter from "../hooks/useSplitter";

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
                <div ref={container} className='flex justify-around w-full h-3/5 bg-slate-700 rounded-2xl'>
                    <div ref={div1} className='flex w-full flex-col gap-2'>
                        <h2 className='text-white text-center mt-3 font-bold text-lg'>Markdown</h2>
                        <textarea name="markdown" id="markdown" className='text-white border-0 h-full w-full focus:outline-none resize-none p-4'></textarea>
                    </div>
                    <div
                        className='w-1.5 min-w-1.5 cursor-col-resize bg-gray-600 hover:bg-gray-400'
                        onMouseDown={handleDown}
                    ></div>
                    <div ref={div2} className='flex w-full flex-col gap-2'>
                        <h2 className='text-white text-center mt-3 font-bold text-lg'>HTML</h2>
                        <textarea name="html" id="html" className='text-white border-0 h-full w-full focus:outline-none resize-none p-4'></textarea>
                    </div>
                </div>
            </main>
        </>
    );
}