const { initDeck, getTrump, getHigherCard, 
    calculateGroupScore, getTrickWinner, playerTurn } = require('./referee')

let user = ''
var players = []
let usr_msg = []
let room = -1
var deck = []
var socket = new WebSocket("ws://localhost:3000/");

/**
 * implementacion de movimientos del juego 
 */
// whos_turn() -> username 
//    jugadores = [username1: {value: '2', type:'diamonds'}, ...]
// make_move(jugadores) -> [username, equipo, {equipo1: pts, equipo2: pts}]
// set_trump_card(card_value) -> void
// get_trump_card() -> {value: '2', type: 'diamonds'}
// init_deck() ->[{value: '2', type:'diamonds'}]
// get_players() -> [username1, username2, username3, username4]
// get_winner() -> team_ganador
function init_deck(){
    // return initDeck()
    console.log("INIT DECK")
    socket.send("init_deck")
}
function get_deck(){
    return deck
}
function whos_turn(){
    return playerTurn(players)
}
function make_move(jugadores){
    const index = getHigherCard(jugadores)
    return getTrickWinner(players, index)
}
function get_trump_card(){
    return getTrump()
}
function get_winner(){
    return calculateGroupScore()
}
function get_players(){
    return players
}

/**
 *  implementacion de chat 
 */
function set_username(username){
    user = username
}
function send_message(message){
    socket.send(['send_message', user, message].join("||"));
}
function receive_message(){
    return usr_msg.pop()
}
function get_username(){
    return user
}
function get_room(){
    return room
}

module.exports ={
    set_username,
    send_message,
    get_room,
    get_players,
    receive_message,
    get_username,
    init_deck,
    whos_turn,
    make_move,
    get_trump_card,
    get_winner,
    get_deck

}

/** 
 *  Implementación de WebSockets. 
 *  action types and (send) message structure:
 *      1. join_room : action||room
 *      2. send_message : action||username||message
 *      3. receive_message : action||message
 *      4. get_players : action||room
 *      5. can_disconnect : action
 *      6. init_deck : action
 */
socket.onopen = function (event) {
    socket.send(['join_room', user].join("||"));
    init_deck()
};

socket.onmessage = function(event) {
    let data = event.data.split("||")
    let action = data[0]
    switch(action){
        case 'join_room':
            room = data[1]
            socket.send(['get_players', room].join("||"))
            break;
        case 'send_players':
            players = JSON.parse(data[1])
            // outputUsers(players)
            break;
        case 'receive_message':
            var msg_json  = JSON.parse(data[1])
            // outputMessage(msg_json)
            usr_msg.push(msg_json)
            break;
        case 'init_deck':
            deck = JSON.parse(data[1])
            console.log("deck", deck)
            initDeck(deck)
            break;

        
    }
}
socket.onclose = function(event) {
    if (event.wasClean) {
        alert(`[close] Connection closed cleanly, code=${event.code} usr=${user}`);
    } else {
        alert('[close] Connection died');
    }
};
  
socket.onerror = function(error) {
    alert(`[error] ${error.message}`);
};
