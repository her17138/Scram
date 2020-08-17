import React, { useState } from "react";
import backImage from "../../assets/back.jpg";
import "./Card.scss";

//  La carta deberia contener (en props supongo)...
//      - Imagen
//      - Tipo de carta
//      - Valor

export default function Card(props) {
  //aqui declaras tu variable, flip y llamas la funcion setFlip(param) para cambiar su valor.
  function handleClick(e) {
    e.preventDefault();
    //set state above
    console.log("updating card state -> passing up to hand")
    let obj = {
      id: props.player + props.img + props.identifier,
      player: props.player,
      value: props.value,
      type: props.identifier
    }
    
    props.updateClick(obj)
    
  }

  return (
    <div
      style={props.style}
      id={props.player + props.img + props.identifier}
      className="card"
      
    >
      <p className="hidden">{props.value}</p>
      <p className="hidden">{props.identifier}</p>
      <p className="hidden">{props.player}</p>
      {props.flipped ? (
        <img draggable="false" className="cardImg" onClick={(e) => {handleClick(e)}} src={props.img}></img>
      ) : (
        <img className="cardImg" draggable="false" src={backImage}></img>
      )}
    </div>
  );
}
