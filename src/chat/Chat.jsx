import React from "react";
import "./Chat.scss"
var client = null
export default class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            message: '',
            old_msg: '',
            username: ''
        }
        client = this.props.clientjs
        // username = this.props.username
        this.sendMessage = this.sendMessage.bind(this)
    }
    // Output message to DOM
    outputMessage(message) {
        const div = document.createElement('div');
        div.classList.add('message');
        div.innerHTML = `<p className="meta">${message.username} <span>${message.time}</span></p>
        <p className="text">
            ${message.text}
        </p>`;
        document.querySelector('.chat-messages').appendChild(div);
        const chatMessages = document.querySelector('.chat-messages');
        // Scroll down
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Add room name to DOM
    outputRoomName(room) {
        console.log('outputroomname '+room)
        const roomName = document.getElementById('room-name');
        roomName.innerText = room;
    }

    // Add users to DOM
    outputUsers(users) {
        const userList = document.getElementById('users');
        userList.innerHTML = `
                ${users.map(user => `<li>${user}</li>`).join('')}
            `;
    }
    receiveMessage(){
        setInterval(function(){ 
            const message = client.receive_message()
            if(message){
                const div = document.createElement('div');
                div.classList.add('message');
                div.innerHTML = `<p className="meta">${message.username} <span>${message.time}</span></p>
                <p className="text">
                    ${message.text}
                </p>`;
                document.querySelector('.chat-messages').appendChild(div);
                const chatMessages = document.querySelector('.chat-messages');
                // Scroll down
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
         }, 100);
    }
    getPlayers(){
        setInterval(function() {
            const usrs = client.get_players()
            const userList = document.getElementById('users');
            userList.innerHTML = `
                    ${usrs.map(user => `<li>${user}</li>`).join('')}
                `;
        }, 500)
        
    }
    sendMessage(){
        const msg = this.state.message
        console.log('msg ' + msg)
        client.send_message(msg)
    }
    getRoom(){
        var room =-1
        var refreshId = setInterval(function() {
            room = client.get_room();
            if (room !== -1) {
                const roomName = document.getElementById('room-name');
                roomName.innerText = room;
                clearInterval(refreshId);
            }
        }, 500);
    }
    componentDidMount(){
        this.setState({username:client.get_username()})
        const ply = client.get_players()
        this.outputUsers(ply)
        console.log(ply)
        this.receiveMessage()
        this.getPlayers()
        this.getRoom()

    }
    render(){
        return(
            <div id="main-chat-container">
                <div className="chat-container">
                <header className="chat-header">
                    <h1><i className="fas fa-smile"></i> ChatCord</h1>
                    <a href="index.html" id="leave-room" className="btn">Leave Room</a>
                </header>
                <main className="chat-main">
                    <div className="chat-sidebar">
                    <h3><i className="fas fa-comments"></i> Room Name:</h3>
                    <h2 id="room-name"></h2>
                    <h3><i className="fas fa-users"></i> Users</h3>
                    <ul id="users"></ul>
                    </div>
                    <div className="chat-messages"></div>
                </main>
                <div className="chat-form-container">
                    <div id="chat-form">
                    <input
                        id="msg"
                        type="text"
                        placeholder="Enter Message"
                        required
                        autoComplete="off"
                        value={this.state.message}
                        onChange={event => this.setState({message:event.target.value})}
                    />
                    <button onClick={this.sendMessage} className="btn"><i className="fas fa-paper-plane"></i> Send</button>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}