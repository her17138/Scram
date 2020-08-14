import React, { useState, useEffect } from "react";
import Chat from './Chat.jsx'
import ReactDOM from "react-dom";

export default class Index extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount () {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/qs/6.9.2/qs.min.js";
        script.integrity = "sha256-TDxXjkAUay70ae/QJBEpGKkpVslXaHHayklIVglFRT4=";
        script.crossOrigin = "anonymous"
        // script.async = true;
        document.body.appendChild(script);
    }
    render(){
        return(
            <div className="join-container">
                    <header className="join-header">
                        <h1><i className="fas fa-smile"></i> ChatCord</h1>
                    </header>
                    <main className="join-main">
                        <form action="chat.html">
                            <div className="form-control">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Enter username..."
                                    required
                                />
                            </div>
                            {/* <div className="form-control">
                                <label for="room">Room</label>
                                <select name="room" id="room">
                                    <option value="JavaScript">JavaScript</option>
                                    <option value="Python">Python</option>
                                    <option value="PHP">PHP</option>
                                    <option value="C#">C#</option>
                                    <option value="Ruby">Ruby</option>
                                    <option value="Java">Java</option>
                                </select>
                            </div> */}
                            <button type="submit" className="btn">Join Chat</button>
                        </form>
                    </main>
                </div>
        )
    }
}
