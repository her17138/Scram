import React, { useState } from "react";
import "./Board.scss";
import Card from "../card/Card.jsx";
import Player from "../player/Player.jsx";
import funcs from '../utilities';

const images = funcs.importImages()
console.log(images)
export default function Board(props) {
  // card init - amount of cards to be rendered..
  let array = [];
  for (let i = 0; i < 5; i++) {
    array.push(i);
  }

  //card litter. Should start with 0 cards.
  const [litter, setLitter] = useState([]);
  return (
    <div className="board">
      <div className="deck">
        {array.map((x) => (
          <Card
            key={x}
            class="target"
            img={images[Fucs.randomIndex(images)].default}
            number={0}
          ></Card>
        ))}
        
      </div>
      <Player name={"fran"}></Player>
      <div className="litter">
        {array.map((x) => (
          <Card
            key={x}
            class="target"
            img={images[Fucs.randomIndex(images)].default}
            number={0}
          ></Card>
        ))}
      </div>
    </div>

  );
}
