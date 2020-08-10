const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});


/** 
 *  action types and message structure:
 *      1. join_room : action||username
 *      2. send_message : action||username||message
 *      3. disconnect : action||username
 *      4. receive_message : action||message
 */
var socket = new WebSocket("ws://localhost:3000/");
socket.onopen = function (event) {
    socket.send(['join_room', username].join("||"));
};

socket.onmessage = function(event) {
    let data = event.data.split("||")
    let action = data[0]
    switch(action){
        case 'receive_message':
            outputMessage(data[1])
            // Scroll down
            chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Message submit
chatForm.addEventListener('submit', e => {
    e.preventDefault();
  
    // Get message text
    const msg = e.target.elements.msg.value;
  
    // Emit message to server
    socket.send(['send_message', msg].join("||"));
  
    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

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
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}
  


