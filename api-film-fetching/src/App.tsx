import './App.css'
import HeaderFilms from './components/HeaderFilms'
import SideLeftBar from './components/SideLeftBar'
import useMoviesStore from './store/useMoviesStore'
import ContentMovies from './components/ContentMovies'
import { useNowPlayingMovies, usePopularMovies, useUpcomingMovies } from './hooks/useMovies'
import SideRightBarMovieInformation from './components/SideRightBarMovieInformation'

function App() {

  const section = useMoviesStore((state) => state.section);
  const selectedMovieId = useMoviesStore((state) => state.selectedMovieId);

  return (
    <div className='grid grid-cols-[250px_1fr] gap-10'>
      <SideLeftBar />
      <div className='flex flex-col gap-5'>
        <HeaderFilms />
        {section === "peliculasPopulares" && <ContentMovies title='Películas populares' endpointHook={usePopularMovies} />}
        {section === "peliculasCartelera" && <ContentMovies title='Películas en cartelera' endpointHook={useNowPlayingMovies} />}
        {section === "proximosEstrenos" && <ContentMovies title='Próximos estrenos' endpointHook={useUpcomingMovies} />}
      </div>
      {selectedMovieId !== 0 && <SideRightBarMovieInformation />}
    </div>
  )
}

export default App
