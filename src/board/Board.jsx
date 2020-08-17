import React from "react";
import "./Board.scss";
import Score from "../score/Score.jsx";
import Hand from "../hand/Hand.jsx";
import Playarea from "../playarea/Playarea.jsx";

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
      turno: "",
      players: [],
      trick: [
        {
          equipo: "",
          suma: 0,
        },
      ],
      scoreG1: 0,
      scoreG2: 0,
      trumpCard: null,
      showScore: false,
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

  showScore = () => {
    this.setState({ showScore: true });
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
        this.showScore();
        this.setState({
          turno: this.props.clientjs.whos_turn(),
        });
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

  updateTurn = (param) => {
    console.log("setting", param)
    this.setState({
      turno: param
      
    })
  };

  // Enviar informacion

  // Main game loop
  //    El while debería de parar hasta que la suma de las cartas de todos los jugadores sea 0
  //    Should stop when there are no more available cards to play on all players

  render() {
    // Player positions in order: 1, 2, 3, 4
    const playerPos = [
      { x: 2, y: 3, rotate: 0, usrRotate: 0 },
      { x: 3, y: 2, rotate: 270, userRotate: 450 },
      { x: 2, y: 1, rotate: 180, userRotate: 360},
      { x: 1, y: 2, rotate: 90, userRotate: 270},
    ];

    return (
      <div className="board">
        {this.state.showScore && <Score players={this.state.players}></Score>} 

        <Playarea
          clientjs={this.props.clientjs}
          turn={this.state.turno}
          updateTurn={this.updateTurn}
        />

        {this.state.players.map((player, i) => (
          <Hand
            username={this.props.clientjs.get_username()}
            player={player.nombre}
            cards={player.hand}
            pos={playerPos[i]}
            turn={this.state.turno}
            clientjs={this.props.clientjs}
          />
        ))}
      </div>
    );
  }
}
