import React, { useContext } from "react";

import "./Playarea.scss";
import Card from "../card/Card";

//para mientras
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

export default class Playarea extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      onDeck: [],
      styles: [{},{right: "25%"},{bottom: "35%"},{bottom: "35%", right:"25%"}]
    }
    this.updateArea = this.updateArea.bind(this)
    
  }
  componentDidMount(){
    this.updateArea()
  }

  
  updateArea(){
    const imgs = [c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,d2,d3,d4,d5,d6,d7,d8,d9,d10,d11,d12,d13,d14,
    h2,h3,h4,h5,h6,h7,h8,h9,h10,h11,h12,h13,h14,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14]
    var values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
    let c_types = ["clubs","diamonds","hearts", "spades"]
    // console.log(c_types) 
    let cards = []
    c_types.map(x => values.forEach((v => cards.push(v+x))))
    let play_space = document.getElementById("playablearea")
    setInterval(() => {
      let move_made = this.props.clientjs.get_latest_move()
      // console.log("move_made update area", move_made)
      if(move_made){
        let new_turn = this.props.clientjs.whos_turn();
        console.log("receiving",new_turn);
        if (new_turn !== this.props.turn) {
          this.props.updateTurn(new_turn);
        }
        console.log("update area", move_made)
        /* let new_card = document.createElement("div", {className: "cardContainer"})
        let new_card_component = document.createElement("div", {
          className:"card",
          identifier:move_made.username.type,
          value:move_made.username.value,
          img:imgs[cards.indexOf(move_made.username.value+move_made.username.type)]
        })
        new_card.appendChild(new_card_component)
        play_space.appendChild(new_card) */

        const upd_cards = this.state.onDeck
        if(upd_cards.length === 4){
          upd_cards = []
        }
        
        upd_cards.push({
          style: this.state.styles[upd_cards.length],
          type:move_made.username.type,
          value:move_made.username.value,
          img_src:imgs[cards.indexOf(move_made.username.value+move_made.username.type)]
        })
      
        this.setState({
          onDeck: upd_cards
        })
        
        
      }
    }, 500)
  }

  //aqui declaras tu variable, flip y llamas la funcion setFlip(param) para cambiar su valor.


  render() {
    return (
      <div
        className="playableArea"
        id="playablearea"
      >
        {
          this.state.onDeck.map((item, i) => (
              <Card 
                key={i}
                flipped={true}
                identifier={item.type}
                style={item.style}
                value={item.value}
                img={item.img_src}
                player={this.props.clientjs.get_username()}
              />
          ))
        }
      </div>
    );
  }
}