import React from "react";
import Card from "./Card";
import './Content.css';

function Content({ characters }) {
  return (
    <div className='App__content'>
      <div className='Content__grid'>
        {characters.map((character) => {
          return <Card character={character} />
        })}
      </div>
    </div>
  );
}

export default Content
