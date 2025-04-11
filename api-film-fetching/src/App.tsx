import './App.css'
import PopularMoviesContent from './components/PopularMoviesContent'
import HeaderFilms from './components/HeaderFilms'
import SideLeftBar from './components/SideLeftBar'
import useMoviesStore from './store/useMoviesStore'
import NowPlayingMoviesContent from './components/NowPlayingMoviesContent'
import UpcomingMoviesContent from './components/UpcomingMoviesContent'

function App() {

  const section = useMoviesStore((state) => state.section);

  return (
    <div className='grid grid-cols-[250px_1fr] gap-10'>
      <SideLeftBar />
      <div className='flex flex-col gap-5'>
        <HeaderFilms />
        {section === "peliculasPopulares" && <PopularMoviesContent />}
        {section === "peliculasCartelera" && <NowPlayingMoviesContent />}
        {section === "proximosEstrenos" && <UpcomingMoviesContent />}
      </div>
    </div>
  )
}

export default App
