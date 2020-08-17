let user = ''
var players = []
let usr_msg = [] //queue de mensajes
let room = -1
var deck = []
var tricks = [] //sera implementado como una cola 
var moves = [] //sera implementado como una cola 
var winner = null
var trump = {}
var current_turn =  '' // se envia el username del jugador al que le toca
var socket = null

// startWebsocket()
console.log("start client")
/**
 * implementacion de movimientos del juego 
 */
// whos_turn() -> username 
//    jugada = {username1: {value: '2', type:'diamonds'}}
// make_move(jugada) -> void
// get_latest_move() -> [username, equipo, {equipo1: pts, equipo2: pts}]
// set_trump_card(card_value) -> void
// get_trump_card() -> {value: '2', type: 'diamonds'}
// init_deck() ->[{value: '2', type:'diamonds'}]
// get_players() -> [username1, username2, username3, username4]
// get_winner() -> index_team_ganador
function init_deck(){
    socket.send("init_deck")
}
function get_deck(){
    return deck
}
function whos_turn(){
    if (current_turn === ''){
        current_turn = players[0]
    }
    return current_turn
}
function make_move(jugada){
    console.log("make MOVE", jugada)
    socket.send(['make_move', JSON.stringify(jugada)].join("||"))
}

function get_trick_winner(){
    console.log('desde el client' + tricks.pop())
    return tricks.pop()
}
function get_latest_move(){
    return moves.pop()
}
function get_trump_card(){
    return trump
}
function get_winner(){
    return winner
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
function exit(){
    socket.send('disconnect')
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
    get_deck,
    get_latest_move,
    get_trick_winner,
    exit,
    startWebsocket
}

/** 
 *  Implementación de WebSockets. 
 *  action types and (send) message structure:
 *      1. join_room : action||room
 *      2. send_message : action||username||message
 *      3. receive_message : action||message
 *      4. get_players : action||room
 *      5. disconnect : action
 *      6. init_deck : action
 *      7. make_move : action||move
 */
function startWebsocket() {
    socket = new WebSocket("ws://localhost:3000/");
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
                trump = deck[deck.length-1]
                // initDeck(deck)
                break;
            case 'get_move':
                moves.push(JSON.parse(data[1]))
                console.log("client getmove", moves)
            case 'trick_winner':
                tricks.push(JSON.parse(data[1]))
            case 'set_trump':
                console.log("set trump", JSON.parse(data[1]))
                trump = JSON.parse(data[1]).username
            case 'game_over':
                winner = JSON.parse(data[1])
            case 'whos_turn':
                console.log("whos turn clientjs", data[1])
                current_turn = data[1]
        }
    }
    socket.onclose = function(event) {
        if (event.wasClean) {
            alert(`[close] Connection closed cleanly, code=${event.code} usr=${user}`);
            socket = null
            // setTimeout(startWebsocket, 500)
        } else {
            alert('[close] Connection died');
        }
    };
      
    socket.onerror = function(error) {
        alert(`[error] ${error.message}`);
    };
    
}