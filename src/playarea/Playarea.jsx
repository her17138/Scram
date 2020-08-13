import React, { useState } from "react";
import backImage from "../../assets/bonz.jpg";
import "./Playarea.scss";

export default function Playarea(props) {
    //aqui declaras tu variable, flip y llamas la funcion setFlip(param) para cambiar su valor.
    const [stack, setStack] = useState([]);

    function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("clicked");
        ev.target.appendChild(document.getElementById(data));
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
        >

            <img className="cardImg" src={backImage}></img>
        </div>
    );
}
