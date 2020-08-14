// const chatForm = document.getElementById('chat-form');
// const chatMessages = document.querySelector('.chat-messages');
// const roomName = document.getElementById('room-name');
// const userList = document.getElementById('users');
// const leaveChat = document.getElementById('leave-room');

// Get username and room from URL
let user = ''
var players = []

/** 
 *  action types and (send) message structure:
 *      1. join_room : action||room
 *      2. send_message : action||username||message
 *      3. receive_message : action||message
 *      4. get_players : action||room
 *      5. can_disconnect : action
 */
var socket = new WebSocket("ws://localhost:3000/");
socket.onopen = function (event) {
    socket.send(['join_room', username].join("||"));
};

socket.onmessage = function(event) {
    let data = event.data.split("||")
    let action = data[0]
    switch(action){
        case 'join_room':
            var room = data[1]
            // outputRoomName(room)
            socket.send(['get_players', room].join("||"))
            break;
        case 'send_players':
            players = JSON.parse(data[1])
            // outputUsers(players)
            break;
        case 'receive_message':
            var msg_json  = JSON.parse(data[1])
            console.log(msg_json)
            // outputMessage(msg_json)
            break;
        
    }
}
socket.onclose = function(event) {
    if (event.wasClean) {
        alert(`[close] Connection closed cleanly, code=${event.code} usr=${username}`);
    } else {
        alert('[close] Connection died');
    }
};
  
socket.onerror = function(error) {
alert(`[error] ${error.message}`);
};

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
    console.log("init deck")
}
function whos_turn(){
    console.log("whos turn")
}
function make_move(jugadores){
    console.log("make move")
}
function get_trump_card(){
    console.log("get trump card")
}
function get_winner(){
    console.log("get winner")
}
function get_players(){
    console.log("get players")
    // return players
}


/**
 *  implementacion de chat 
 */
function set_username(username){
    user = username
}
function send_message(message){
    socket.send(['send_message', username, msg].join("||"));
}
function get_room(){
    return room
}
function get_users(){
    return players   
}

module.exports ={
    set_username,
    send_message,
    get_room,
    get_players,
    get_users
}


