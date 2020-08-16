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
      turno: [],
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

    var images = [back, dorval, hans, mijangos];
  }

  /* init of references
     INPUT: natural number of player (4)
     OUTPUT: array of references. 
   */

  componentDidMount() {
    this.buildPlayers();
    //this.updateTurn();
  }

  getDeck = () => {
    this.setState({
      deck: this.props.clientjs.get_deck(),
    });
  };

  buildPlayers = () => {
    let current = [];

    let id = setInterval(() => {
      let usrs = this.props.clientjs.get_players();
      // [] {} -> nombre

      if (usrs.length === 4) {
        usrs.forEach((usr) => {
          current.push({
            nombre: usr,
            hand: [],
            equipo: "",
            turno: false,
          });
        });
        this.setState({
          players: current,
        });
        this.getDeck();
        this.dealCard();
        this.setState({
          turno: this.props.clientjs.whos_turn()
        })
        clearInterval(id);
      }
    }, 1000);
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
  dealCard = () => {
    /* let actualDeck = this.state.deck;
    let players = this.state.players; */
    const playerArr = this.state.players;
    const deckArr = this.state.deck;
    try {
      for (let i = 0; i < playerArr.length; i++) {
        for (let j = 0; j < 12; j++) {
          playerArr[i].hand.push(deckArr.pop());
        }
      }
      this.setState({
        players: playerArr,
      });
      console.log("reached set state");
      console.log("play", playerArr);
    } catch (e) {
      console.warn("jaja");
    }

    //players[{},{},{}]

    //playerArr[0].hand.push(this.props.clientjs.get_trump_card());
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
        <CardsContext.Provider value={this.state.turno}>
          <Playarea clientjs={this.props.clientjs} turn={this.state.turno} />
        </CardsContext.Provider>
        {this.state.players.map((player, i) => (
          <Hand
            username={this.props.clientjs.get_username()}
            player={player.nombre}
            cards={player.hand}
            pos={playerPos[i]}
            turn={this.state.turno}
          />
        ))}
      </div>
    );
  }
}
