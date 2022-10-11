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
  const [ids, setIds] = useState([])

  useEffect(() => {
    const getRandomIds = (n = 24, max = 826) => {
      let randomArr = []
      while (randomArr.length < n) {
        const number = Math.floor(Math.random() * max) + 1
        if (randomArr.indexOf(number) === -1) randomArr.push(number)
      }
      return randomArr
    }

    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character/' + randomIds)
        const data = await response.json()
        setCharacters(data)
      } catch (error) {
        console.error(error)
      }
    }

    const randomIds = getRandomIds()
    fetchCharacters()
    setIds(randomIds)
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
