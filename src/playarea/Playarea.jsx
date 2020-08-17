import React, { useContext } from "react";

import "./Playarea.scss";

export default function Playarea(props) {
  //aqui declaras tu variable, flip y llamas la funcion setFlip(param) para cambiar su valor.

  function drop(ev) {
    ev.preventDefault();
    
    let data = ev.dataTransfer.getData("clicked");
    let card = document.getElementById(data);
    ev.target.appendChild(card.parentElement);
    //jalamos padre por el wrapper de la carta.

    if (ev.dataTransfer.getData("owner") === props.turn) {
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

      props.clientjs.make_move(playerObj);

      console.log("server says", props.clientjs.whos_turn());
      triggerState()
      //cardContext = props.clientjs.whos_turn()
      //cardContext = props.clientjs.whos_turn()
    }
  }

  function triggerState() {
    if (props.turn === "") {
      console.log("setting initial turn");
      props.updateTurn(props.clientjs.whos_turn());
    } else {
      let id = setInterval(() => {
        let new_turn = props.clientjs.whos_turn();
        console.log(new_turn);
        if (new_turn !== props.turn) {
          props.updateTurn(new_turn);
          clearInterval(id);
        }
      }, 100);
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
