import React, { useContext } from "react";
import { CardsContext, TurnContext } from "../board/Board.jsx";

import "./Playarea.scss";

export default function Playarea(props) {
  //aqui declaras tu variable, flip y llamas la funcion setFlip(param) para cambiar su valor.

  const cardContext = useContext(CardsContext);

  function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("clicked");
    let card = document.getElementById(data);
    //jalamos padre por el wrapper de la carta.

    if (ev.dataTransfer.getData("owner") === props.turn) {
      ev.target.appendChild(card.parentElement);

      let pts = card.getElementsByTagName("p")[0].innerHTML;
      let identifier = card.getElementsByTagName("p")[1].innerHTML;
      let player = card.getElementsByTagName("p")[2].innerHTML;
      let playerObj = {
        username: {
          value: pts,
          type: identifier,
        },
      };
      //modificar arreglo del board

      cardContext.push(playerObj);
      props.clientjs.make_move(playerObj)
    }
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }

  return (
    <div
      className="playableArea"
      id="playablearea"
      onDrop={(e) => {
        drop(e);
      }}
      onDragOver={(e) => {
        allowDrop(e);
      }}
    ></div>
  );
}
