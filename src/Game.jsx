import React, { useState, useEffect } from "react";
import Chat from './Chat.jsx'
import Board from './board/Board.jsx'

var client = require('./js/client')
var username = 'lulu'
export default function Game(props) {
    client.set_username(username)
    return(
        <div>
            <Board clientjs={client}/>
            <Chat clientjs={client}/>
        </div>
    )
}