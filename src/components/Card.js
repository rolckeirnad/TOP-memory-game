import React from "react";
import './Card.css';

function Card() {
  return (
    <div className="Card">
      <img className="Card__image" src="https://placekitten.com/g/300/300" alt="card" />
      <div className="Card__name">Name</div>
    </div>
  );
}

export default Card;
