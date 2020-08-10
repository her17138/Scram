  
import React, { useState } from "react";
import "./Board.scss";
import Card from "../card/Card.jsx";
import Player from "../player/Player.jsx";
import Fucs from '../js/utilities';
///
import back from '../../assets/back.jpg'
import dorval from '../../assets/dorval.jpg'
import hans from '../../assets/hans.jpg'
import mijangos from '../../assets/mijangos.jpg'


export default function Board(props) {
  let images = [back, dorval, hans, mijangos];
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
            img={images[Fucs.randomInterval(images.length)]}
            number={0}
          ></Card>
        ))}
        
      </div>
      <Player player={"fran"}></Player>
      <div className="litter">
        {array.map((x) => (
          <Card
            key={x}
            class="target"
            img={images[Fucs.randomInterval(images.length)]}
            number={0}
          ></Card>
        ))}
      </div>
    </div>

  );
}
