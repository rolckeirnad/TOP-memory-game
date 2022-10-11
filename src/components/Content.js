import React, { useRef, useState } from "react";
import Card from "./Card";
import './Content.css';
import spinnerImg from './../assets/images/spinner.png'

function Content({ characters, clickHandler }) {
  const [spinner, setSpinner] = useState(true)
  const loadedImages = useRef(0)

  const imageHandler = () => {
    loadedImages.current += 1
    if (loadedImages.current >= characters.length) {
      setSpinner(false)
    }
  }

  return (
    <div className='App__content'>
      <div className="Content__spinner" style={{ display: spinner ? "flex" : "none" }}>
        <img className="Content__spinner__img" src={spinnerImg} alt="loading spinner" />
        <p className="Content__spinner__text">Loading...</p>
      </div>
      <div className='Content__grid' style={{ display: spinner ? "none" : "grid" }}>
        {characters.map((character) => {
          return <Card character={character} clickHandler={clickHandler} imageHandler={imageHandler} key={`card-${character.id}`} />
        })}
      </div>
    </div>
  );
}

export default Content
