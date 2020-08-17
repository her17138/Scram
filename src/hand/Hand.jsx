import React from "react";
import Card from "../card/Card.jsx";
import Fucs from "../js/utilities.js";

import c2 from "../../assets/clubs/2.png";
import c3 from "../../assets/clubs/3.png";
import c4 from "../../assets/clubs/4.png";
import c5 from "../../assets/clubs/5.png";
import c6 from "../../assets/clubs/6.png";
import c7 from "../../assets/clubs/7.png";
import c8 from "../../assets/clubs/8.png";
import c9 from "../../assets/clubs/9.png";
import c10 from "../../assets/clubs/10.png";
import c11 from "../../assets/clubs/11.png";
import c12 from "../../assets/clubs/12.png";
import c13 from "../../assets/clubs/13.png";
import c14 from "../../assets/clubs/14.png";

import d2 from "../../assets/diamonds/2.png";
import d3 from "../../assets/diamonds/3.png";
import d4 from "../../assets/diamonds/4.png";
import d5 from "../../assets/diamonds/5.png";
import d6 from "../../assets/diamonds/6.png";
import d7 from "../../assets/diamonds/7.png";
import d8 from "../../assets/diamonds/8.png";
import d9 from "../../assets/diamonds/9.png";
import d10 from "../../assets/diamonds/10.png";
import d11 from "../../assets/diamonds/11.png";
import d12 from "../../assets/diamonds/12.png";
import d13 from "../../assets/diamonds/13.png";
import d14 from "../../assets/diamonds/14.png";

import h2 from "../../assets/hearts/2.png";
import h3 from "../../assets/hearts/3.png";
import h4 from "../../assets/hearts/4.png";
import h5 from "../../assets/hearts/5.png";
import h6 from "../../assets/hearts/6.png";
import h7 from "../../assets/hearts/7.png";
import h8 from "../../assets/hearts/8.png";
import h9 from "../../assets/hearts/9.png";
import h10 from "../../assets/hearts/10.png";
import h11 from "../../assets/hearts/11.png";
import h12 from "../../assets/hearts/12.png";
import h13 from "../../assets/hearts/13.png";
import h14 from "../../assets/hearts/14.png";

import s2 from "../../assets/spades/2.png";
import s3 from "../../assets/spades/3.png";
import s4 from "../../assets/spades/4.png";
import s5 from "../../assets/spades/5.png";
import s6 from "../../assets/spades/6.png";
import s7 from "../../assets/spades/7.png";
import s8 from "../../assets/spades/8.png";
import s9 from "../../assets/spades/9.png";
import s10 from "../../assets/spades/10.png";
import s11 from "../../assets/spades/11.png";
import s12 from "../../assets/spades/12.png";
import s13 from "../../assets/spades/13.png";
import s14 from "../../assets/spades/14.png";

import "./Hand.scss";
export default class Hand extends React.Component {
  //let images = [dorval, hans, mijangos];
  constructor(props) {
    super(props);

    this.state = {
      cards: props.cards,
      clicked: {
        id: "",
        player: "",
        value: null,
        type: "",
      },
    };
  }
  //object id, player, value, type
  clickOnCard = (param) => {
    let obj = { username: { value: param.value, type: param.type } };
    this.props.clientjs.make_move(obj);
    let check = false;

    for (let i = 0; i < this.props.cards.length; i++) {
      let checkType = this.props.trumpCard.type;
      if (this.props.cards[i].type === checkType) {
        check = true;
        console.log("common type!");
      }
      if (
        this.props.cards[i].value === param.value &&
        this.props.cards[i].type === param.type
      ) {
        //we need to see that the one we clicked is that type
        if (check === true) {
          if (param.type === checkType) {
            console.log("met criteria!", param.type, checkType)
            this.popCard(i);
          } else {
            alert("Ponga carta que sea mismo tipo que trump card");
          }
        } else {
          console.log("pop", i);
          this.popCard(i);
        }
      }
    }
  };
  popCard = (cardId) => {
    if (cardId > -1) {
      let newHand = this.props.cards.splice(cardId, 1);
      console.log("setting", newHand);
      this.setState({
        cards: newHand,
      });
    }
  };

  dropEnd = (event) => {
    console.log("event", event);
    let data = event.dataTransfer.getData("clicked");
    console.log("data", data);
    let dragged_obj = document.getElementById(data);
    console.log("dragged_obj", dragged_obj);
    let index = dragged_obj.getElementsByTagName("p")[1].innerHTML;
    console.log("llegando", props.player, props.turn);
    if (
      dragged_obj.parentElement.parentElement.id === "playablearea" &&
      props.turn === props.player
    ) {
      popCard(index);
      cards.pop();
      setCard(cards);
    }
  };

  render() {
    const images = [
      c2,
      c3,
      c4,
      c5,
      c6,
      c7,
      c8,
      c9,
      c10,
      c11,
      c12,
      c13,
      c14,
      d2,
      d3,
      d4,
      d5,
      d6,
      d7,
      d8,
      d9,
      d10,
      d11,
      d12,
      d13,
      d14,
      h2,
      h3,
      h4,
      h5,
      h6,
      h7,
      h8,
      h9,
      h10,
      h11,
      h12,
      h13,
      h14,
      s2,
      s3,
      s4,
      s5,
      s6,
      s7,
      s8,
      s9,
      s10,
      s11,
      s12,
      s13,
      s14,
    ];
    const handStyle = {
      gridColumn: `${this.props.pos.x - 5}/${this.props.pos.x}`,
      gridRow: `${this.props.pos.y}`,
      display: "flex",
      padding: "20px",
      width: "245px",
      position: "relative",
      height: "150px",
      transform: `rotate(${this.props.pos.rotate}deg)`,
    };
    var flip = true;
    if (this.props.player !== this.props.username) {
      handStyle.pointerEvents = "none";
      flip = false;
    }

    return (
      <div style={handStyle} id={this.props.player + "hand"}>
        {this.props.cards.map((x, i) => (
          <div className="cardContainer">
            <Card
              key={i}
              identifier={this.props.cards[i].type}
              flipped={flip}
              player={this.props.player}
              img={
                images[
                  Fucs.getImage(
                    this.props.cards[i].value,
                    this.props.cards[i].type
                  )
                ]
              }
              value={this.props.cards[i].value}
              updateClick={this.clickOnCard}
            ></Card>
          </div>
        ))}
        <div className="username-container">
          <h3>{this.props.player}</h3>
        </div>
      </div>
    );
  }
}
