import React from "react";
import "./Board.scss";

import back from "../../assets/back.jpg";
import dorval from "../../assets/dorval.jpg";
import hans from "../../assets/hans.jpg";
import mijangos from "../../assets/mijangos.jpg";
import Hand from "../hand/Hand.jsx";
import Playarea from "../playarea/Playarea.jsx";

export var CardsContext = React.createContext();

/* PLAYER STRUCTURE
{
  nombre: "",
  hand: [],
  equipo: "",
  turno: false,
}, 
 */
export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //  "nombre_carta","valor_carta"
      // j || 11 || k || 13 || //

      deck: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      playedCards: [],
      players: [],
      trick: [
        {
          equipo: "",
          suma: 0,
        },
      ],
      
      trumpCard: null,
    };

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
    let deck = null;
    for (let i = 0; i < 12; i++) {
      array.push(i);
    }

    this.getDeck();
    this.getPlayers();
    this.dealCard(this.state.players, this.state.deck);
  }

  getDeck = () => {
    this.setState({
      deck: this.props.clientjs.init_deck(),
    });
  };

  getPlayers = () => {
    let current = this.state.players;
    setInterval(() => {
      let usrs = this.props.clientjs.get_players();

      //aarray.. x, y z

      // [] {} -> nombre
      if (current.length !== usrs.length) {
        current.push({
          nombre: usrs[usrs.length - 1],
          hand: [],
          equipo: "",
          turno: false,
        });
      }
    }, 1000);
    this.setState({
      players: current,
    });
    console.log("array_lulu", this.state.players);
  };

  addCard(e) {
    e.preventDefault();

    let tmpArr = this.state.hand;
    tmpArr.push(0);
    this.setState({
      hand: tmpArr,
    });
  }

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
  dealCard = (playerArr, deckArr) => {
    /* let actualDeck = this.state.deck;
    let players = this.state.players; */

    while (deckArr.length !== 0) {
      console.log(deckArr.pop());

      //playerArr[0].hand.push(this.state.trumpCard);
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

  // Enviar informacion

  // Main game loop
  //    El while debería de parar hasta que la suma de las cartas de todos los jugadores sea 0
  //    Should stop when there are no more available cards to play on all players

  render() {
    var images = [back, dorval, hans, mijangos];

    // Player positions in order: 1, 2, 3, 4
    const playerPos = [
      { x: 2, y: 3, rotate: 0 },
      { x: 3, y: 2, rotate: 270 },
      { x: 2, y: 1, rotate: 180 },
      { x: 1, y: 2, rotate: 90 },
    ];

    return (
      <div className="board">
        <CardsContext.Provider value={this.state.playedCards}>
          <Playarea />
        </CardsContext.Provider>
        <Hand
          player={"franz heidacher"}
          cards={this.state.deck}
          pos={playerPos[0]}
        />
        <Hand
          player={"dieter de wit"}
          cards={this.state.deck}
          pos={playerPos[1]}
        />
        <Hand
          player={"luis esturban"}
          cards={this.state.deck}
          pos={playerPos[2]}
        />
        <Hand
          player={"paulo mejia"}
          cards={this.state.deck}
          pos={playerPos[3]}
        />
      </div>
    );
  }
}
