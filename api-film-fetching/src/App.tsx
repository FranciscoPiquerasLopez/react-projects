import './App.css'
import HeaderFilms from './components/HeaderFilms'
import SideLeftBar from './components/SideLeftBar'
import useMoviesStore from './store/useMoviesStore'
import ContentMovies from './components/ContentMovies'
import SideRightBarMovieInformation from './components/SideRightBarMovieInformation'

function App() {
  const selectedMovieId = useMoviesStore((state) => state.selectedMovieId);

  return (
    <div className='grid grid-cols-[250px_1fr] gap-10 h-screen'>
      <SideLeftBar />
      <div className='flex flex-col gap-5'>
        <HeaderFilms />
        <ContentMovies />
      </div>
      {selectedMovieId !== 0 && <SideRightBarMovieInformation />}
    </div>
  )
}

export default App
