import { React, useState } from "react";
import "./Board.scss";
import Card from "../card/Card.jsx";
export default function Board(props) {
  // card init - amount of cards to be rendered..
  let array = [];
  for (let i = 0; i < 50; i++) {
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
            img={"./assets/hans.jpeg"}
            number={0}
          ></Card>
        ))}
      </div>

      <div className="litter">
        {array.map((x) => (
          <Card
            key={x}
            class="target"
            img={"./assets/hans.jpeg"}
            number={0}
          ></Card>
        ))}
      </div>
    </div>
  );
}
