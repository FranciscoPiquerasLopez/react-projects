import { useGlobalStore } from "../hooks/states/useGlobalStore";

export default function HtmlPanel({ div2 }: { div2: React.RefObject<HTMLDivElement | null> }) {

    const htmlText = useGlobalStore((state) => state.htmlText);

    return (
        <>
            <div ref={div2} className='flex w-full flex-col gap-2 bg-white rounded-2xl'>
                <h2 className='text-center mt-3 font-bold text-lg'>HTML</h2>
                <div
                    className="prose p-4 overflow-auto"
                    dangerouslySetInnerHTML={{ __html: htmlText }}
                />
            </div>
        </>
    );
}