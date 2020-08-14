import React, { useState } from "react";
import backImage from "../../assets/back.jpg";
import "./Card.scss";

//  La carta deberia contener (en props supongo)...
//      - Imagen
//      - Tipo de carta
//      - Valor

export default function Card(props) {
  //aqui declaras tu variable, flip y llamas la funcion setFlip(param) para cambiar su valor.
  const [flipped, setFlip] = useState(false);
  function handleClick(e) {
    e.preventDefault();
    setFlip((prevVal) => !prevVal);
  }

  return (
    <div
      id={props.player + props.img}
      className="card"
      draggable="true"
      onClick={(e) => {
        handleClick(e);
      }}
      onDragEnd={(e) => {
        props.endFunction(e);
      }}
      onDragStart={(e) => {
        props.startFunction(e);
      }}
    >
      <p className="hidden">{props.value}</p>
      <p id="arguello" className="hidden">{props.identifier}</p>
      {flipped ? (
        <img draggable="false" className="cardImg" src={props.img}></img>
      ) : (
        <img className="cardImg" draggable="false" src={backImage}></img>
      )}
    </div>
  );
}
