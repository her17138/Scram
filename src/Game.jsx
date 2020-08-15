import React, { useState, useEffect } from "react";
import Chat from './Chat.jsx'
import Board from './board/Board.jsx'
export default function Game(props) {
    console.log(props)
    var username = props.location.state.username
    console.log(username)
    var client = require('./js/client')
    client.set_username(username)
    return(
        <div>
            <Board clientjs={client}/>
            <Chat clientjs={client}/>
        </div>
    )
}