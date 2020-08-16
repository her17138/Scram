import React, { useState } from "react";
import Card from "../card/Card.jsx";
import Fucs from "../js/utilities.js";

import dorval from "../../assets/dorval.jpg";
import hans from "../../assets/hans.jpg";
import mijangos from "../../assets/mijangos.jpg";

import "./Hand.scss";
export default function Hand(props) {
  //this array should contain the names of
  let images = [dorval, hans, mijangos];

  const [cards, setCard] = useState(props.cards);

  function popCard(cardId) {
    let index = cards.indexOf(cardId);
    
    if (index > -1) {
      let newHand = cards.splice(index, 1);
      setCard(newHand);
    }

    
  }

  function dragStart(event) {
    event.dataTransfer.setData("clicked", event.target.id);
  }

  function dropEnd(event) {
    let data = event.dataTransfer.getData("clicked");
    
    let dragged_obj = document.getElementById(data);

    let index = dragged_obj.getElementsByTagName("p")[1].innerHTML;
    if (dragged_obj.parentElement.parentElement.id === "playablearea") {
      
      popCard(index);
      cards.pop();
      
      setCard(cards);
    }
  }

  const handStyle = {
    gridColumn: `${props.pos.x}/${props.pos.x}`,
    gridRow: `${props.pos.y}`,
    display: "flex",
    padding: "20px",
    width: "245px",
    height: "150px",
    transform: `rotate(${props.pos.rotate}deg)`
  };
  
  return (
    <div style={handStyle} id={props.player + "hand"}>
      
      {props.cards.map((x, i) => (
        <div className="cardContainer">
          <Card
            key={i}
            identifier={i}
            player={props.player}
            img={images[Fucs.randomInterval(images.length)]}
            startFunction={dragStart}
            endFunction={dropEnd}
            value={Fucs.randomInterval(5)}
          ></Card>
        </div>
      ))}
    </div>
  );
}
