import React from "react";
import './Card.css';

function Card({ character, clickHandler, imageHandler }) {
  return (
    <div className="Card" id={character.id} onClick={clickHandler}>
      <img className="Card__image" src={character.image} onLoad={imageHandler} alt="card" />
      <div className="Card__name">{character.name}</div>
    </div>
  );
}

export default Card;
