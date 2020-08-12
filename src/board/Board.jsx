import React from "react";
import "./Board.scss";
import Card from "../card/Card.jsx";
import Fucs from "../js/utilities";
import back from "../../assets/back.jpg";
import dorval from "../../assets/dorval.jpg";
import hans from "../../assets/hans.jpg";
import mijangos from "../../assets/mijangos.jpg";
import Hand from "../hand/Hand.jsx";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomPlayers: [0, 0, 0, 0],
      deck: [],
      reference: React.createRef()
    };
    const types = ["spades", "clubs", "diamonds", "hearts"];
    
    // Card list init
    let cards = [];
    for (let i = 0; i < types.length; i++) {
      for (let j = 1; j < 14; j++) {
        cards.push({
          type: types[i],
          value: j,
          img_path: "../../assets/" + types[i] + "/" + j + ".jpg",
        });
      }
    }

    //cards = shuffle(cards);
    var images = [back, dorval, hans, mijangos];
    

    
  }

  /* init of references
     INPUT: natural number of player (4)
     OUTPUT: array of references. 
   */

  call = (ref) => {
    console.log("ref",ref)
    ref.current.addCard();
  };

  componentDidMount(){
    let array = []
    for (let i = 0; i < 5; i++) {
      array.push(i);
    }
    this.setState({
      deck: array,
      cementery: array,
      reference: React.createRef()
    })
    //this.call(this.state.reference)
  }

  // card init - amount of cards to be rendered..

  shuffle = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  // Create players
  // yo imagino que en props recibimos algo con los jugadores?

  /* TODO */
  // Borrar wrapper (Player)
  // Poner players como arrays temporales que serán asignados al estado de mano
  // Board afecta array de cartas a hand

  // Deal cards
  //    Deal a card, and rotate player. Last card doesnt get directly dealt, it is first shown as the trump card and then is given to the dealer.
  // while (true){
  // Conseguir ultima carta
  // players[1].cartas.push(cards[-1]);
  // Darsela al player

  // Quitar la carta de la lista de cartas
  // }

  // Enviar informacion

  // Main game loop
  //    El while debería de parar hasta que la suma de las cartas de todos los jugadores sea 0
  //    Should stop when there are no more available cards to play on all players

  //card litter. Should start with 0 cards.
  render() {
    var images = [back, dorval, hans, mijangos];

    return (
      <div className="board">
        
        <div className="deck">
          {this.state.deck.map((x) => (
            <Card
              key={x}
              class="target"
              img={images[Fucs.randomInterval(images.length)]}
              number={0}
            ></Card>
          ))}
        </div>
          <Hand player={"Ernesto"} cards={[0,0,0,0]}></Hand>;
      </div>
    );
  }
}
