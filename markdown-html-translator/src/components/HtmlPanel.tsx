import { useState } from "react";
import { useGlobalStore } from "../hooks/states/useGlobalStore";
import { prettify } from "htmlfy";

export default function HtmlPanel({ div2 }: { div2: React.RefObject<HTMLDivElement | null> }) {
    const htmlText = useGlobalStore((state) => state.htmlText);
    const [previewHTML, setPreviewHTML] = useState<boolean>(true);

    const handleClick = (value: boolean) => {
        setPreviewHTML(value);
    };

    return (
        <>
            <div ref={div2} className='panel__html'>
                <ul className="panel__html__navbar">
                    <li><button className="panel__html__navbar_elements" onClick={() => handleClick(true)}>Preview HTML</button></li>
                    <li><button className="panel__html__navbar_elements" onClick={() => handleClick(false)}>Raw HTML</button></li>
                </ul>
                {
                    previewHTML
                        ?
                        <div
                            className="panel__html__previewHTML"
                            dangerouslySetInnerHTML={{ __html: htmlText }}
                        />
                        :
                        <textarea
                            name="html"
                            id="html"
                            className="panel__html__textarea"
                            disabled={true}
                            value={prettify(htmlText)}>
                        </textarea>
                }
            </div>
        </>
    );
}