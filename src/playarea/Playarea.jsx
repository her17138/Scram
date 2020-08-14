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
        var data = ev.dataTransfer.getData("clicked");
        ev.target.appendChild(document.getElementById(data));
        var card = document.getElementById(data);
        var pts = card.getElementsByTagName("p")[0].innerHTML;

        //modificar arreglo del board
        cardContext.push(pts);
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }


    return (
        <div
            className="playableArea"   
            onDrop={(e) => {
                drop(e);
            }}
            onDragOver={(e) => {
                allowDrop(e);
            }}
        >

        
        </div>
    );
}
