import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import './Content.css';

function Content({ fetchedCharacters, incrementCounter, setNewGame }) {
  const [characters, setCharacters] = useState()
  const [loaded, setLoaded] = useState(false)
  const [clicked, setClicked] = useState([])
  const [end, setEnd] = useState(false)
  const last = useRef(null)

  useEffect(() => {
    shuffleCharacters(fetchedCharacters)
  }, [fetchedCharacters])

  useEffect(() => {
    setLoaded(true)
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
    last.current = characters.find((character) => {
      return character.id.toString() === id
    })
    const continueGame = addId(id)
    if (continueGame) {
      incrementCounter()
      if (clicked.length + 1 >= characters.length) {
        endGame()
      }
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
    setNewGame()
  }

  return (
    <div className='App__content'>
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
                <button type="button" onClick={resetGame}>Play again</button>
              </div>
            </div>
          </div>
        </div>
      }
      { }
      <div className='Content__grid' >
        {loaded && characters.map((character) => {
          return <Card character={character} clickHandler={clickHandler} key={`card-${character.id}`} />
        })}
      </div>
    </div>
  );
}

export default Content
