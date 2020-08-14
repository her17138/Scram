import React from "react";

var client = null
export default class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            message: '',
            username: ''
        }
        client = this.props.clientjs
    }
    // Output message to DOM
    outputMessage(message) {
        const div = document.createElement('div');
        div.classNameList.add('message');
        div.innerHTML = `<p className="meta">${message.username} <span>${message.time}</span></p>
        <p className="text">
            ${message.text}
        </p>`;
        document.querySelector('.chat-messages').appendChild(div);
    }

    // Add room name to DOM
    outputRoomName(room) {
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
    sendMessage(){
        const chatMessages = document.querySelector('.chat-messages');
        const msg = this.state.message
        client.send_message(msg)
        // Scroll down
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    componentDidMount(){
        this.outputRoomName(client.get_room())
        this.outputUsers(client.get_users())
    }
    render(){
        return(
            <div>
                <div className="chat-container">
                <header classNameName="chat-header">
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
                    <form id="chat-form">
                    <input
                        id="msg"
                        type="text"
                        placeholder="Enter Message"
                        required
                        autoComplete="off"
                        onChange={event => this.setState({message:event.target.value})}
                    />
                    <button onClick={this.sendMessage} className="btn"><i className="fas fa-paper-plane"></i> Send</button>
                    </form>
                </div>
                </div>
            </div>
        )
    }
}