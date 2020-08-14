import React, { useState } from "react";
import Card from "../card/Card.jsx";
import Fucs from "../js/utilities.js";

import back from "../../assets/back.jpg";
import dorval from "../../assets/dorval.jpg";
import hans from "../../assets/hans.jpg";
import mijangos from "../../assets/mijangos.jpg";

import "./Hand.scss";
export default function Hand(props) {
  //this array should contain the names of
  let images = [back, dorval, hans, mijangos];

  const [cards, setCard] = useState(props.cards);

  function popCard(cardId) {
    const index = cards.indexOf(cardId);
    if (index > -1) {
      let newHand = cards.splice(index, 1);
      setCard(newHand);
    }
    console.log("pop card", String(cardId));
  }

  function dragStart(event) {
    event.dataTransfer.setData("clicked", event.target.id);
  }

  function dropEnd(event) {
    let data = event.dataTransfer.getData("clicked");
    let dragged_obj = document.getElementById(data);
    let index = dragged_obj.getElementsByTagName("p")[0].innerHTML
    let oldParent = document.getElementById(props.player+"hand")
    event.target.appendChild(document.getElementById(data));

    switch (dragged_obj.parentElement.className) {
      case "playableArea":
        break;
      case "cardImg":
        let original_target = document.getElementById("playablearea");
        original_target.appendChild(dragged_obj);
        console.log("card",dragged_obj.parentElement)
        break;

      default:
        alert("invalid move!");
        console.log("old", oldParent)
        oldParent.appendChild(dragged_obj)
        break;
    }
    
    popCard(index);
  }
  return (
    <div className="hand" id={props.player+"hand"}>
      {cards.map((x, i) => (
        <div className="cardContainer">
          <Card
            key={i}
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
