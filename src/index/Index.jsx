import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router'
import './Index.scss'
import '../css/style.scss'

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
            <div className="container">
                <section id="content">
                    <h1 >WHIST ROOM</h1>

                    <div className="flex-first">
                        <div className="left">
                        <div>
                                        <div id="deck">
                                            <div class="card" id="blackCard2">
                                                <p class="cardLabel black">A</p>
                                            </div>
                                            <div class="card" id="blackCard1">
                                                <p class="cardLabel black">J</p>
                                            </div>
                                            <div class="card" id="redCard">
                                                <p class="cardLabel red">Q</p>
                                            </div>
                                            <div class="card" id="heartCard">
                                                <p class="cardLabel red">K</p>
                                                <div id="heart"></div>
                                            </div>
                                        </div>
                                    </div>
                        
                                <form action="">
                                
                                
                                    <div>
                                        <input 
                                            type="text" 
                                            placeholder="Username" 
                                            required="" 
                                            name="username"
                                            onChange={event => this.setState({username:event.target.value})}
                                            id="username" />
                                    </div>
        
                                    <div>
                                        <button className="enter" onClick={this.handleClick} type="button">Join Room</button>
                                    </div>
                                    
                                </form>

                                
                            
                        </div>
                        <div className="right-first">
                                
                                
                                    <div id="rules">
    
                                <h2 className="rainbow-text">How to play</h2>
                                <br></br>
                                <br></br>
                                <p>
                                Whist is a simple trick taking game, played in pairs. The players sitting across from each other
                                are a team and together they try to get as many tricks as possible. 
                                </p>
                                <br></br>
                                <br></br>


                                <p>Each player gets dealt 13 cards. The first player to start is chosen randomly, in the next round 
                                the person to start will be the next person to the left of the person who started the current round.
                                (1 round is 13 tricks, i.e. starting a new round is when all the cards are finished and are dealt again).</p>
                                <br></br>
                                <br></br>

                                <p>
                                In each round there is a special trump suit, whose cards are considered higher than
                                all the other suits. Every fifth round there is no trump. The order of trumps goes:
                                Hearts, Spades, Diamonds, Clubs, No Trump.
                                </p>
                                <br></br>
                                <br></br>

                                <p>
                                A player leading a trick can put out a card in any suit he wants, even the trump suit.
                                The players that follow must put out cards in the same suit if they have at least one. If
                                they have no cards in the same suit they may put out any card they want. The player who
                                puts out the highest card in the suit takes the trick, unless someone has put out a trump card, in which
                                case the highest trump card takes it. The player who takes the trick will then lead in the next trick.
                                </p>
                                <br></br>
                                <br></br>

                                <p>
                                After a round is finished the score is calculated. The tricks of each team are counted, and they get a point
                                for each trick over 6 tricks. So if <span class="left-player-name">Mike</span> and 
                                <span class="right-player-name">Lisa</span> get 8 tricks and 
                                <span class="bottom-player-name">You</span> and 
                                <span class="top-player-name">Bill</span> get 5, then 
                                <span class="left-player-name">Mike</span> and <span class="right-player-name">Lisa</span>
                                get 2 points but <span class="bottom-player-name">You</span> 
                                and <span class="top-player-name">Bill</span> get no points. Points are tracked between rounds and the first team to get
                                7 points wins the entire game. Since there are 13 tricks in each round and you get points for number of
                                tricks above 6 that means that if you get all 13 tricks you will be able to win in one round. 
                                </p>
                                <br></br>
                                <br></br>

                            </div>
                            
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
