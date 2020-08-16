import React, { useState, useEffect } from "react";
import Chat from '../chat/Chat.jsx'
import Board from '../board/Board.jsx'
import './Game.scss'
import '../css/style.scss'

export default function Game(props) {
    var username = props.location.state.username
    var client = require('../js/client')
    client.set_username(username)
    client.startWebsocket()
    return(
        <div className="game">
            <div className="chat">
                <Chat clientjs={client}/>
            </div>
            <div className="board-dv">
                <Board clientjs={client}/>
            </div>
        </div>
    )
}