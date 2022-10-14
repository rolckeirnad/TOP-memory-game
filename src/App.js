import { useEffect, useState } from 'react';
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
  const [retries, setRetries] = useState(0)

  useEffect(() => {
    getData()
  }, [retries])

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

  const getData = async () => {
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
    /* const result = await fetchCharacters(randomIds)
    setData(result) */
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
    setRandom(null)
    setSpinner(true)
    setDisplay(false)
    setRounds(1)
    setRetries(retries + 1)
  }

  const toggleSpinner = (state) => {
    setSpinner(state)
  }

  const { isLoading, isSuccess, isError } = useQuery(['plumbus', random], async () => {
    const result = await fetchCharacters(random)
    setData(result)
    return result
  }, {
    enabled: !!random,
    refetchOnWindowFocus: false
  })

  return (
    <div className="App">
      <Header counter={counter} />
      {spinner &&
        <Spinner />
      }
      {data && display &&
        <Content
          fetchedCharacters={data.slice(0, 24)}
          counter={counter}
          incrementCounter={incrementCounter}
          setNewGame={setNewGame}
          toggleSpinner={toggleSpinner}
        />}
      <Footer />
    </div>
  );
}

export default App;
