import React, { useState, useEffect } from "react";
import Chat from './Chat.jsx'
import ReactDOM from "react-dom";
import {Link} from "react-router-dom"
import { Redirect } from 'react-router'

export default class Index extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            redirect: false
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        this.setState({redirect: true});
    }
    render(){
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: "/game",
                state: { username: this.state.username }
              }}/>;
        }
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
                                    onChange={event => this.setState({username:event.target.value})}
                                    required
                                />
                            </div>
                            {/* <Link to='/game' params={{ username: this.state.username }}> Join Room</Link> */}
                            <button onClick={this.handleClick} type="button">Join Room</button>
                        </form>
                    </main>
                </div>
        )
    }
}
