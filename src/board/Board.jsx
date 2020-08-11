  
import React, { useState } from "react";
import "./Board.scss";
import Card from "../card/Card.jsx";
import Player from "../player/Player.jsx";
import Fucs from '../js/utilities';
///
import back from '../../assets/back.jpg'
import dorval from '../../assets/dorval.jpg'
import hans from '../../assets/hans.jpg'
import mijangos from '../../assets/mijangos.jpg'


export default function Board(props) {
  let images = [back, dorval, hans, mijangos];
  let types = ["spades", "clubs", "diamonds", "hearts"]

  // card init - amount of cards to be rendered..
  let array = [];
  for (let i = 0; i < 5; i++) {
    array.push(i);
  }

  function shuffle(array){
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array
  }


  // Card list init
  let cards = [];
  for (let i = 0; i < types.length; i++) {
    for (let j = 1; j < 14; j++) {
      cards.push({
                  type: types[i], 
                  value: j, 
                  img_path: '../../assets/'+types[i]+'/'+j+'.jpg'
                });
    }
  }

  cards = shuffle(cards);

  // Create players
  // yo imagino que en props recibimos algo con los jugadores?
  let players = props.players;
  playersObj = []
  for (let i=0; i < players.length; i++) {
    playersObj.push(players[i])
  }

  playersObj.map((player, index) => {
    return <Player player={player} />
  })

  /* TODO */
  // Borrar wrapper (Player)
  // Poner players como arrays temporales que serán asignados al estado de mano
  // Board afecta array de cartas a hand

  // Deal cards
  //    Deal a card, and rotate player. Last card doesnt get directly dealt, it is first shown as the trump card and then is given to the dealer.
  while (true){
    // Conseguir ultima carta
    players[1].cartas.push(cards[-1]);
    // Darsela al player
    
    // Quitar la carta de la lista de cartas
  }

  // Enviar informacion

  // Main game loop
  //    El while debería de parar hasta que la suma de las cartas de todos los jugadores sea 0
  //    Should stop when there are no more available cards to play on all players

  //card litter. Should start with 0 cards.
  const [litter, setLitter] = useState([]);
  return (
    <div className="board">
      <div className="deck">
        {array.map((x) => (
          <Card
            key={x}
            class="target"
            img={images[Fucs.randomInterval(images.length)]}
            number={0}
          ></Card>
        ))}
        
      </div>
      <Player player={"fran"}></Player>
      <div className="litter">
        {array.map((x) => (
          <Card
            key={x}
            class="target"
            img={images[Fucs.randomInterval(images.length)]}
            number={0}
          ></Card>
        ))}
      </div>
    </div>

  );
}
