import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import './Content.css';
import spinnerImg from './../assets/images/spinner.png'

function Content({ fetchedCharacters, counter, incrementCounter, setNewGame }) {
  const [characters, setCharacters] = useState([])
  const [spinner, setSpinner] = useState(true)
  const [clicked, setClicked] = useState([])
  const [end, setEnd] = useState(false)
  const last = useRef(null)
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
      endGame(id)
    }
  }

  const addId = (id) => {
    if (clicked.includes(id) === false) {
      const newClickedArr = [...clicked, id]
      setClicked(newClickedArr)
      return true
    } else return false
  }

  const endGame = (id) => {
    last.current = characters.find((character) => {
      return character.id.toString() === id
    })
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
          <div className="Content__endScreen__results">
            <p>Your score was: {counter.actual}</p>
            {counter.actual > counter.max && <p>You set a new high score!</p>}
          </div>
          <div className="Content__endScreen__selections">
            <div className="Content__endScreen__overview">
              {clicked.map((id) => characters.find((character) => character.id.toString() === id)
              ).map((clickedCharacter) => {
                return (
                  <div className="Content__endScreen__card" key={`endCard-${clickedCharacter.id}`}>
                    <img className="Content__endScreen__card__img" src={clickedCharacter.image} alt={clickedCharacter.name} />
                    <p className="Content__endScreen__card__name">{clickedCharacter.name}</p>
                  </div>
                )
              })
              }
            </div>
            <div className="Content__endScreen__lastSelection">
              <p>Your last selection:</p>
              <div className="Content__endScreen__lastSelection__container" >
                <img className="Content__endScreen__lastSelection__container__img" src={last.current.image} alt={last.current.name} />
                <p className="Content__endScreen__lastSelection__container__name">{last.current.name}</p>
              </div>
              <div className="Content__endScreen__buttons">
                <button type="button" onClick={setNewGame}>Play again</button>
              </div>
            </div>
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
