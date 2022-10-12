import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import './Content.css';
import spinnerImg from './../assets/images/spinner.png'

function Content({ fetchedCharacters, incrementCounter, setNewGame }) {
  const [characters, setCharacters] = useState([...fetchedCharacters])
  const [spinner, setSpinner] = useState(true)
  const [clicked, setClicked] = useState([])
  const [end, setEnd] = useState(false)
  const loadedImages = useRef(0)

  useEffect(() => {
    loadedImages.current = 0
    setSpinner(true)
    setEnd(false)
    setClicked([])
    setCharacters([...fetchedCharacters])
  }, [fetchedCharacters])

  // Fisher–Yates shuffle method
  const shuffleCharacters = () => {
    let shuffledArray = [...characters]
    let length = shuffledArray.length;

    while (length) {
      const i = Math.floor(Math.random() * length--);
      [shuffledArray[length], shuffledArray[i]] = [shuffledArray[i], shuffledArray[length]]
    }
    setCharacters(shuffledArray)
  }

  const imageHandler = () => {
    loadedImages.current += 1
    if (loadedImages.current >= characters.length) {
      setSpinner(false)
    }
  }

  const clickHandler = (e) => {
    const id = e.target.parentElement.id
    const continueGame = addId(id)
    if (continueGame) {
      incrementCounter()
      shuffleCharacters()
    } else {
      endGame()
    }
  }

  const addId = (id) => {
    if (clicked.includes(id) === false) {
      const newClickedArr = [...clicked, id]
      setClicked(newClickedArr)
      return true
    } else return false
  }

  const endGame = () => {
    setEnd(true)
  }

  return (
    <div className='App__content'>
      <div className="Content__spinner" style={{ display: spinner ? "flex" : "none" }}>
        <img className="Content__spinner__img" src={spinnerImg} alt="loading spinner" />
        <p className="Content__spinner__text">Loading...</p>
      </div>
      {end &&
        <div className="Content__endScreen">
          <p>This will display end game</p>
          <div className="Content__endScreen__buttons">
            <button type="button" onClick={setNewGame}>Play again</button>
          </div>
        </div>
      }
      <div className='Content__grid' style={{ display: spinner ? "none" : "grid" }}>
        {characters.map((character) => {
          return <Card character={character} clickHandler={clickHandler} imageHandler={imageHandler} key={`card-${character.id}`} />
        })}
      </div>
    </div>
  );
}

export default Content
