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
      //  "nombre_carta","valor_carta"
      // j || 11 || k || 13 || //

      deck: [0, 0, 0, 0],
      players: [
        {
          nombre: "",
          hand: [],
          equipo,
          turno: false,
        },
      ],

      trick: [
        {
          equipo: "",
          suma: 0,
        },
      ],
      hand: [],
    };

    var globalTrumpCard = undefined;
    const types = ["spades", "clubs", "diamonds", "hearts"];

    // Card list init
    //TODO -> repurpose
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

  componentDidMount() {
    let array = [];
    for (let i = 0; i < 12; i++) {
      array.push(i);
    }
    this.setState({
      deck: array,
      cementery: array,
    });
    //this.call(this.state.reference)
  }

  addCard(e) {
    e.preventDefault();
    console.log("gustavo de leon");
    let tmpArr = this.state.hand;
    tmpArr.push(0);
    this.setState({
      hand: tmpArr,
    });
  }

  // card init - amount of cards to be rendered..

  // Create players
  // yo imagino que en props recibimos algo con los jugadores?
  /* 
      newPlayer(params){
        let x = this.state.players
        obj = {
          nombre: "",
          hand: [],
          equipo: ""
        }
        x.push(obj)

      }
  
  */

  /* TODO */
  // Poner players como arrays temporales que serán asignados al estado de mano

  // Deal cards
  //    Deal a card, and rotate player. Last card doesnt get directly dealt, it is first shown as the trump card and then is given to the dealer.

  dealCard = () => {
    let actualDeck = this.state.deck;
    let players = this.state.players;
    let trumpCard = undefined;
    while (actualDeck.length !== 0) {
      for (let i = 0; i < players.length; i++) {
        players[i].hand.push(actualDeck[-1]);

        if (actualDeck.length === 1) {
          trumpCard = actualDeck.pop();
        }
        //elimina ultimo elemento
        actualDeck.pop();
      }

      //first player gets trump card -> hes the dealer
      players[0].hand.push(trumpCard);
      globalTrumpCard = trumpCard;
    }
  };

  isHandEmpty = () => {
    let players = this.state.players;
    let count = 0;
    for (let i = 0; i < players.length; i++) {
      count = player[i].hands.length + count;
    }
    //gracias zea
    return count === 0 ? true : false;
  };

  /* 
    retuns team which won, param -> name of teams in array, else returns -1
  */
  calculateTrick = (arrTeam) => {
    let trick = this.state.trick;
    let teamA = trick.filter((elem) => {
      elem.equipo === arrTeam[0];
    });
    let teamB = trick.filter((elem) => {
      elem.equipo === arrTeam[1];
    });
    let sumA = null;
    let sumB = null;
    teamA.map((e) => {
      sumA = teamA.suma + 1;
    });

    teamB.map((e) => {
      sumB = sumB.suma + 1;
    });
    if(sumB !== sumA){
      return (sumB > sumA ? arrTeam[0] : arrTeam[1])
    } else{
      return -1
    }
    
  };

  playTrick = () => {
    while (!this.isHandEmpty()) {
      this.nextTurn();
    }
  };
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
        <Hand player={"Ernesto"} cards={this.state.hand}></Hand>;
      </div>
    );
  }
}
