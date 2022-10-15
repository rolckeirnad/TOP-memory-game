import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import Header from './components/Header'
import Content from './components/Content';
import Footer from './components/Footer'
import Spinner from './components/Spinner'
import fetchCharacters from './rickmorty';
import { useQuery } from '@tanstack/react-query';

function App() {
  const [data, setData] = useState()
  const [random, setRandom] = useState()
  const [counter, setCounter] = useState({ actual: 0, max: 0 })
  const [rounds, setRounds] = useState(1)
  const [spinner, setSpinner] = useState(true)
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    setRandomIds()
  }, [])

  useEffect(() => {
    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image;
        loadImg.onload = () => resolve(image);
        loadImg.onerror = (err) => reject(err);
      });
    }

    data && Promise.all(data.slice(0, 24).map((character) => loadImage(character.image)))
      .then(() => {
        setSpinner(false)
        setDisplay(true)
      })
      .catch((err) => console.error("Failed to load images", err));

  }, [data])

  const setRandomIds = () => {
    // This ids don't have image
    const noImage = ["19", "66", "104", "189", "249"]
    const getRandomIds = (n = 30, max = 826) => {
      let randomArr = []
      while (randomArr.length < n) {
        const number = Math.floor(Math.random() * max) + 1
        if (randomArr.indexOf(number) === -1 && noImage.includes(number.toString()) === false) {
          randomArr.push(number)
        }
      }
      return randomArr
    }

    const randomIds = getRandomIds()
    setRandom(randomIds)
  }

  const incrementCounter = useCallback(() => {
    setCounter(prevCounter => ({
      ...prevCounter,
      actual: prevCounter.actual + 1,
    }))
  }, [])

  const setNewGame = useCallback(() => {
    setCounter(prevCounter => ({
      actual: 0,
      max: prevCounter.actual > prevCounter.max ? prevCounter.actual : prevCounter.max,
    }))
    setData(null)
    setRandom(null)
    setSpinner(true)
    setDisplay(false)
    setRounds(1)
    setRandomIds()
  }, [])

  const toggleSpinner = useCallback((state) => {
    setSpinner(state)
  }, [])

  useQuery(['plumbus', random], async () => {
    const result = await fetchCharacters(random)
    setData(result)
    return result
  }, {
    enabled: !!random,
    refetchOnWindowFocus: false
  })

  const cachedCharacters = useMemo(() => data && data.slice(0, 24), [data])

  return (
    <div className="App">
      <Header counter={counter} />
      {spinner &&
        <Spinner />
      }
      {data && display &&
        <Content
          fetchedCharacters={cachedCharacters}
          incrementCounter={incrementCounter}
          setNewGame={setNewGame}
          toggleSpinner={toggleSpinner}
        />}
      <Footer />
    </div>
  );
}

export default App;
