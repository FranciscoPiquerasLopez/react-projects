import { useGlobalStore } from "../hooks/states/useGlobalStore";

export default function HtmlPanel({ div2 }: { div2: React.RefObject<HTMLDivElement | null> }) {

    const htmlText = useGlobalStore((state) => state.htmlText);

    return (
        <>
            <div ref={div2} className='panel__html'>
                <h2 className='panel__html__title'>HTML</h2>
                <div
                    className="panel__html__textarea"
                    dangerouslySetInnerHTML={{ __html: htmlText }}
                />
            </div>
        </>
    );
}