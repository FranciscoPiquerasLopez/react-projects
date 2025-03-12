import { useRef } from "react";

export default function useSplitter() {
    const div1 = useRef<HTMLDivElement>(null);
    const div2 = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLDivElement>(null);
    const lastX = useRef(0);

    const handleDown = (e: React.MouseEvent) => {
        e.preventDefault();
        lastX.current = e.clientX;
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResize);
    };

    const resize = (e: MouseEvent) => {
        const dx = e.clientX - lastX.current;
        const newWidth = div1.current!.clientWidth + dx;

        // Límites para que ni el div1 ni el div2 se contraiga del todo
        if (newWidth < 250 || newWidth > container.current!.clientWidth - 250) return;

        div1.current!.style.width = newWidth + "px";
        div2.current!.style.width = container.current!.clientWidth - newWidth - 6 + "px";
        lastX.current = e.clientX;
    }

    const stopResize = () => {
        window.removeEventListener('mousemove', resize);
        window.removeEventListener('mouseup', stopResize);
    }

    return { div1, div2, container, handleDown };
}