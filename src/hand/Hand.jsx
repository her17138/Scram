import React, { useState } from "react";
import Card from "../card/Card.jsx";
import Fucs from "../js/utilities.js";

import back from "../../assets/back.jpg";
import dorval from "../../assets/dorval.jpg";
import hans from "../../assets/hans.jpg";
import mijangos from "../../assets/mijangos.jpg";

export default function Hand(props) {
  //this array should contain the names of
  let images = [back, dorval, hans, mijangos];

  const [cards, setCard] = useState(props.cards);

  function addCard() {
    setCard((cards) => cards.push(0));
    console.log("adding")
  }

  function popCard(cardId) {
    
    const index = cards.indexOf(cardId);
    if (index > -1) {
      let newHand = cards.splice(index, 1);
      setCard(newHand);
    }
    console.log("pop card", String(cardId))

  }

  function dragStart(event) {
    event.dataTransfer.setData("clicked", event.target.id);
  }

  function dropEnd(event) {
    let data = event.dataTransfer.getData("clicked");
    let dragged_obj = document.getElementById(data);
    let parent_elem = dragged_obj.parentElement;
    console.log("parent!", parent_elem);
    let dragged_obj_value = dragged_obj.getElementsByTagName("p")[0].innerHTML;
    event.target.appendChild(document.getElementById(data));
    let target_value = event.target.getElementsByTagName("p")[0].innerHTML;
    //si el elemento es mayor solo por un numero, se agrega como child.
    if (target_value - dragged_obj_value == 1) {
      console.log("success");
    } else {
      console.log("incorrect!");
      parent_elem.appendChild(dragged_obj);
    }
  }
  return (
    <div className="hand">
      {cards.map((x, i) => (
        <Card
          key={i}
          player={props.player}
          img={images[Fucs.randomInterval(images.length)]}
          startFunction={dragStart}
          endFunction={dropEnd}
          value={Fucs.randomInterval(5)}
        ></Card>
      ))}
    </div>
  );
}
