const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const leaveChat = document.getElementById('leave-room');

// Get username and room from URL
const { username} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
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
            outputRoomName(room)
            socket.send(['get_players', room].join("||"))
            break;
        case 'send_players':
            players = JSON.parse(data[1])
            outputUsers(players)
            break;
        case 'receive_message':
            var msg_json  = JSON.parse(data[1])
            outputMessage(msg_json)
            // Scroll down
            chatMessages.scrollTop = chatMessages.scrollHeight;
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

// get_players() -> [username1, username2, ...]
function get_players(){
    return players
}

// whos_turn() -> username 

//    jugadores = [username1: {value: '2', type:'diamonds'}, ...]
// make_move(jugadores) -> [username, equipo, {equipo1: pts, equipo2: pts}]

// set_trump_card(card_value) -> void

// get_trump_card() -> {value: '2', type: 'diamonds'}

// init_deck() ->[{value: '2', type:'diamonds'}]

// get_players() -> [username1, username2, username3, username4]


/**
 *  implementacion de chat 
 */
// Message submit
chatForm.addEventListener('submit', e => {
    e.preventDefault();
  
    // Get message text
    const msg = e.target.elements.msg.value;
  
    // Emit message to server
    socket.send(['send_message', username, msg].join("||"));
  
    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

leaveChat.addEventListener('click', e => {
    // e.preventDefault();
    closeSocket(socket)
})

async function closeSocket(socket){
    await socket.send(["disconnect", username].join("||"))    
    // socket.onmessage = await function(event){
    //     let data = event.data.split("||")
    //     let action = data[0]
    //     if(action === "can_disconnect"){
    //         socket.close()
    //     }
    // }
    // socket.close()
}

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
userList.innerHTML = `
        ${users.map(user => `<li>${user}</li>`).join('')}
    `;
}


