import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header'
import Content from './components/Content';
import Footer from './components/Footer'

function App() {
  const [characters, setCharacters] = useState([])
  const [counter, setCounter] = useState({ actual: 0, max: 0 })
  const [rounds, setRounds] = useState(0)

  useEffect(() => {
    updateCharacters()
  }, [rounds])

  const updateCharacters = () => {
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
  }

  const incrementCounter = () => {
    setCounter({
      ...counter,
      actual: counter.actual + 1,
    })
  }

  const setNewGame = () => {
    const newMax = counter.actual > counter.max ? counter.actual : counter.max
    setCounter({
      actual: 0,
      max: newMax
    })
    setRounds(rounds + 1)
  }

  return (
    <div className="App">
      <Header counter={counter} />
      <Content
        fetchedCharacters={characters}
        counter={counter}
        incrementCounter={incrementCounter}
        setNewGame={setNewGame}
      />
      <Footer />
    </div>
  );
}

export default App;
