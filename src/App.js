import { useEffect, useState } from 'react';
import './App.css';
import headerLogo from './assets/images/rick-and-morty-logo-font-free-download.jpg'
import Content from './components/Content';

function Header({ counter }) {
  return (
    <div className='App__header'>
      <img className='App__header__logo' src={headerLogo} alt="Rick and Morty logo" />
      <h1 className='App__header__title'>Memory Card</h1>
      <div className='App__header__score'>
        <p>Best Score: {counter.max}</p>
        <p>Score: {counter.actual}</p>
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
  const [counter, setCounter] = useState({ actual: 0, max: 0 })
  const [clicked, setClicked] = useState([])

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
  }, [])

  // Fisher–Yates shuffle method
  const shuffleCharacters = () => {
    let shuffledArray = [...characters]
    var length = shuffledArray.length;

    while (length) {
      const i = Math.floor(Math.random() * length--);
      [shuffledArray[length], shuffledArray[i]] = [shuffledArray[i], shuffledArray[length]]
    }
    setCharacters(shuffledArray)
  }

  const incrementCounter = () => {
    const newActual = counter.actual + 1
    const newMax = newActual > counter.max ? newActual : counter.max
    setCounter({
      actual: newActual,
      max: newMax
    })
  }

  const resetGame = () => {
    setClicked([])
    setCounter({ actual: 0, max: counter.max })
    shuffleCharacters()
  }

  const addId = (id) => {
    if (clicked.includes(id) === false) {
      const newClickedArr = [...clicked, id]
      setClicked(newClickedArr)
      return true
    } else return false
  }

  const clickHandler = (e) => {
    const id = e.target.parentElement.id
    const continueGame = addId(id)
    if (continueGame) {
      incrementCounter()
      shuffleCharacters()
    } else {
      // Show Results
      console.log('End game. Score:', counter.actual)
      resetGame()
    }
  }

  return (
    <div className="App">
      <Header counter={counter} />
      <Content characters={characters} clickHandler={clickHandler} />
      <Footer />
    </div>
  );
}

export default App;
