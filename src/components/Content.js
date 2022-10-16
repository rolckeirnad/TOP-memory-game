import React, { useCallback, useEffect, useRef, useState } from "react";
import Card from "./Card";
import './Content.css';

function Content({ fetchedCharacters, incrementCounter, setNewGame, toggleSpinner, incrementRound }) {
  const [characters, setCharacters] = useState()
  const scroll = useRef(0)
  const appContent = useRef(null)
  const contentGrid = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [clicked, setClicked] = useState([])
  const [next, setNext] = useState(false)
  const [end, setEnd] = useState(false)
  const last = useRef(null)

  const checkNextRound = useCallback((clicks) => {
    if (clicks.length >= fetchedCharacters.length) {
      setNext(true)
    }
  }, [fetchedCharacters])

  useEffect(() => {
    checkNextRound(clicked)
  }, [clicked, checkNextRound])

  useEffect(() => {
    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image;
        loadImg.onload = () => resolve(image);
        loadImg.onerror = (err) => reject(err);
      });
    }

    Promise.all(fetchedCharacters.map((character) => loadImage(character.image)))
      .then(() => {
        shuffleCharacters(fetchedCharacters)
        toggleSpinner(false)
        setLoaded(true)
      })
      .catch((err) => console.error("Failed to load images", err));

  }, [fetchedCharacters, toggleSpinner])

  useEffect(() => {
    appContent.current.scrollTo(0, scroll.current)
  }, [characters])

  // Fisher–Yates shuffle method
  const shuffleCharacters = (array) => {
    let shuffledArray = [...array]
    let length = shuffledArray.length;

    while (length) {
      const i = Math.floor(Math.random() * length--);
      [shuffledArray[length], shuffledArray[i]] = [shuffledArray[i], shuffledArray[length]]
    }
    setCharacters(shuffledArray)
  }

  const clickHandler = (e) => {
    const id = e.target.parentElement.id
    scroll.current = Math.abs(contentGrid.current.getBoundingClientRect().y) + Math.abs(appContent.current.getBoundingClientRect().y)
    last.current = characters.find((character) => {
      return character.id.toString() === id
    })
    const continueGame = addId(id)
    if (continueGame) {
      incrementCounter()
      shuffleCharacters(characters)
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

  const resetGame = () => {
    setEnd(false)
    setClicked([])
    setLoaded(false)
    scroll.current = 0
    setNewGame()
  }

  const continueToNextRound = () => {
    setNext(false)
    setClicked([])
    setLoaded(false)
    scroll.current = 0
    incrementRound()
  }

  return (
    <div className='App__content' ref={appContent} >
      {end &&
        <div className="Content__endScreen">
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
                <button className="Content__button --play-button" type="button" onClick={resetGame}>Play again</button>
              </div>
            </div>
          </div>
        </div>
      }
      {next &&
        <div className="Content__nextRound">
          <div className="Content__nextRound__description">
            <p>Well done! You clicked {clicked.length} cards correctly!</p>
          </div>
          <div className="Content__nextRound__buttons">
            <button className="Content__button --next-button" type="button" onClick={continueToNextRound}>Play next round</button>
          </div>
        </div>
      }
      <div className='Content__grid' ref={contentGrid} >
        {loaded && characters.map((character) => {
          return <Card character={character} clickHandler={clickHandler} key={`card-${character.id}`} />
        })}
      </div>
    </div>
  );
}

export default Content
