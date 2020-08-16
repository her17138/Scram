import React from "react";
import "./Chat.scss"
import { Redirect } from 'react-router'
var client = null
export default class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            message: '',
            old_msg: '',
            username: '',
            room: -1,
            exit: false
        }
        client = this.props.clientjs
        // username = this.props.username
        this.sendMessage = this.sendMessage.bind(this)
        this.getRoom = this.getRoom.bind(this)
        this.exitRoom = this.exitRoom.bind(this)
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
    getRoom() {
        var room_nm =-1
        var refreshId = setInterval(function(){
            room_nm = client.get_room();
            if (room_nm !== -1) {
                const roomName = document.getElementById('room-name');
                roomName.innerText = `Room: ${room_nm}`
                console.log("innerhtml")
                clearInterval(refreshId);
            }
        }, 500);
    }
    exitRoom(){
        client.exit()
        this.setState({
            exit:true
        })

    }
    componentDidMount(){
        this.setState({username:client.get_username()})
        this.outputUsers(client.get_players())
        this.receiveMessage()
        this.getPlayers()
        this.getRoom()

    }
    render(){
        if (this.state.exit) {
            return <Redirect to={{
                pathname: "/"
              }}/>;
        }
        return(
            <div id="main-chat-container">
                <div className="chat-container">
                <header className="chat-header">
                    <div id="room-name-container">
                        <i className="icon fas fa-comments"></i><h3 id="room-name">Room: </h3>
                    </div>
                    {/* <h3 id="room-name"></h3> */}
                    <button onClick={this.exitRoom} id="leave-room" className="btn">Leave Room</button>
                </header>
                <main className="chat-main">
                    <div className="chat-sidebar">
                    <h3><i className="icon fas fa-users"></i> Users</h3>
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