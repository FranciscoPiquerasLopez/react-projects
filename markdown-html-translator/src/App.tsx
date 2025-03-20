import './App.css'
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
    <>
      <div className="background">
        <div className="grid-overlay"></div>
        <div className="radial-gradient"></div>

        <div className="container">
          <Header />
          <Main />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App