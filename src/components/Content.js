import React from "react";
import Card from "./Card";
import './Content.css';

function Content({ characters, clickHandler }) {
  return (
    <div className='App__content'>
      <div className='Content__grid'>
        {characters.map((character) => {
          return <Card character={character} clickHandler={clickHandler} key={`card-${character.id}`} />
        })}
      </div>
    </div>
  );
}

export default Content
