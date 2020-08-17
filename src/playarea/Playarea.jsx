import React, { useContext } from "react";

import "./Playarea.scss";

export default class Playarea extends React.Component {
  constructor(props){
    super(props)
    this.updateArea = this.updateArea.bind(this)
    
  }
  componentDidMount(){
    this.updateArea()
  }
  updateArea(){
    var values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
    let play_space = document.getElementById("playablearea")
    setInterval(() => {
      let move_made = this.props.clientjs.get_latest_move()
      if(move_made){
        let new_turn = this.props.clientjs.whos_turn();
        console.log("receiving",new_turn);
        if (new_turn !== this.props.turn) {
          this.props.updateTurn(new_turn);
        }
        console.log("update area", move_made)
        let new_card = document.createElement("div", {className: "cardContainer"})
        new_card.innerHTML = `
          <Card
            identifier=${move_made.username.type}
            img="../../assets/${move_made.username.type}/${values.indexOf(move_made.username.value)+2}
            value=${move_made.username.value}
          ></Card>
        `
        play_space.appendChild(new_card)
      }
    })
  }

  //aqui declaras tu variable, flip y llamas la funcion setFlip(param) para cambiar su valor.


  render() {
    return (
      <div
        className="playableArea"
        id="playablearea"
      ></div>
    );
  }
}
