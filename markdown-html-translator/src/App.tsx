import { useRef } from 'react'
import GithubImage from './components/svg/GithuhImage'
import './App.css'

function App() {
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

    console.log('Div 1: ' + div1.current!.clientWidth);
    console.log('Div 2: ' + div2.current!.clientWidth);
    console.log('Container: ' + container.current!.clientWidth);
  }

  const stopResize = () => {
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResize);
  }

  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      <div className='grid grid-cols-1 grid-rows-[35px_auto_50px] max-w-7xl mx-auto p-6 min-h-screen'>
        <header className='flex justify-end'>
          <a href="https://github.com/FranciscoPiquerasLopez" target='_blank'>
            <GithubImage />
          </a>
        </header>
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
        <footer className='flex justify-center items-center'>
          <span className='text-amber-50 text-lg font-bold'>Hecho por @Francisco</span>
        </footer>
      </div>
    </>
  )
}

export default App