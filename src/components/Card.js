import React from "react";
import './Card.css';

function Card({ character }) {
  return (
    <div className="Card" key={character.id}>
      <img className="Card__image" src={character.image} alt="card" />
      <div className="Card__name">{character.name}</div>
    </div>
  );
}

export default Card;
