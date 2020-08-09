import React from "react";
import Card from "../card/Card.jsx";
import Fucs from "../js/utilities.js";

import back from '../../assets/back.jpg'
import dorval from '../../assets/dorval.jpg'
import hans from '../../assets/hans.jpg'
import mijangos from '../../assets/mijangos.jpg'

export default function Hand(props) {
  
  //this array should contain the names of
  let images = [back, dorval, hans, mijangos];
  //function that returns random index in arr array.
  function randomIndex(array) {
    let size = array.length;
    return Math.floor(Math.random() * size + 1);
  }
  return (
    <div className="hand">
      {props.cards.map((x, i) => (
        <Card
          key={i}
          player={props.player}
          img={images[Fucs.randomIndex(images)]}
          startFunction={Fucs.dragStart}
          endFunction={Fucs.dropEnd}
        ></Card>
      ))}
    </div>
  );
}

// img={"../../assets/" + arr[randomIndex(arr)]}