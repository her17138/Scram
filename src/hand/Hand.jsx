import React from "react";
import Card from "../card/Card.jsx";
import Fucs from "../utilities.js";
export default function Hand(props) {
  //this array should contain the names of
  let arr = ["back.jpg", "dorval.jpg", "hans.jpeg", "mijangos.jpg"];
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
          img={"../../assets/" + arr[randomIndex(arr)]}
          startFunction={Fucs.dragStart}
          endFunction={Fucs.dropEnd}
        ></Card>
      ))}
    </div>
  );
}
