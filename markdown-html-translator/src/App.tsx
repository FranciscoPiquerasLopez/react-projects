import './App.css'
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      <div className='grid grid-cols-1 grid-rows-[35px_auto_50px] max-w-7xl mx-auto p-6 min-h-screen'>
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  )
}

export default App