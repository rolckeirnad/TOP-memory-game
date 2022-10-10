import React from "react";
import Card from "./Card";
import './Content.css';

function Content() {
  return (
    <div className='App__content'>
      <div className='Content__grid'>
        {Array(12).fill("").map((character, index) => {
          return <Card />
        })}
      </div>
    </div>
  );
}

export default Content
