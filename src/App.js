import { useEffect, useState } from 'react';
import './App.css';
import headerLogo from './assets/images/rick-and-morty-logo-font-free-download.jpg'
import Content from './components/Content';

function Header() {
  return (
    <div className='App__header'>
      <img className='App__header__logo' src={headerLogo} alt="Rick and Morty logo" />
      <h1 className='App__header__title'>Memory Card</h1>
      <div className='App__header__score'>
        <p>Best Score: 0</p>
        <p>Score: 0</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className='App__footer'>
      <a className='App__footer__link' href="https://github.com/rolckeirnad/TOP-memory-game">GitHub</a>
    </div>
  );
}

function App() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    // Temporal array to fetch some characters
    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character/' + ids)
        const data = await response.json()
        setCharacters(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchCharacters()
  }, [])

  return (
    <div className="App">
      <Header />
      <Content characters={characters} />
      <Footer />
    </div>
  );
}

export default App;
