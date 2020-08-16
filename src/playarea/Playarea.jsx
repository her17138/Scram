import React, { useState, useContext } from "react";
import { CardsContext } from "../board/Board.jsx";
import backImage from "../../assets/bonz.jpg";
import "./Playarea.scss";

export default function Playarea(props) {
  //aqui declaras tu variable, flip y llamas la funcion setFlip(param) para cambiar su valor.
  const [stack, setStack] = useState([]);
  const cardContext = useContext(CardsContext);

  function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("clicked");
    let card = document.getElementById(data);
    //jalamos padre por el wrapper de la carta.
    ev.target.appendChild(card.parentElement);

    let pts = card.getElementsByTagName("p")[0].innerHTML;
    let player = card.getElementsByTagName("p")[2].innerHTML;
    let playerObj = {
      player: player,
      points: pts,
    };
    //modificar arreglo del board

    cardContext.push(playerObj);
    
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
