import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import './Content.css';
import spinnerImg from './../assets/images/spinner.png'

function Content({ fetchedCharacters, incrementCounter, setNewGame }) {
  const [characters, setCharacters] = useState([])
  const [spinner, setSpinner] = useState(true)
  const [clicked, setClicked] = useState([])
  const [end, setEnd] = useState(false)
  // This ids don't have image
  const noImage = [19, 104, 189, 249]

  useEffect(() => {
    setSpinner(true)
    setEnd(false)
    setClicked([])
    setCharacters([...fetchedCharacters])
  }, [fetchedCharacters])

  useEffect(() => {
    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image;
        loadImg.onload = () => resolve(image);
        loadImg.onerror = (err) => reject(err);
      });
    }

    Promise.all(characters.map((character) => loadImage(character.image)))
      .then(() => setSpinner(false))
      .catch((err) => console.error("Failed to load images", err));
  }, [characters])

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
          return <Card character={character} clickHandler={clickHandler} key={`card-${character.id}`} />
        })}
      </div>
    </div>
  );
}

export default Content
