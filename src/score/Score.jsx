import React from "react";
import "./Score.scss"

var ups = null
export default class Score extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            grupo1:0,
            grupo2:0,
            usrG1:this.props.players[0].nombre + ' ' + this.props.players[2].nombre,
            usrG2:this.props.players[1].nombre + ' ' + this.props.players[3].nombre

        }
        
    }

    updateScore() {
        ups = setInterval(() => {
            const trickWinner = this.props.clientjs.get_trick_winner()
            console.log('trickWinner' + trickWinner)
            if(trickWinner){
                for (i = 0; i < this.props.players.length; i++) {
                    if(trickWinner === this.props.players[i].nombre){
                        if(i % 2 == 0){
                            g1 += 1
                            this.setState({grupo1: g1})
                        } else {
                            g2 += 2
                            this.setState({grupo2: g2})
                        }
                    }
                }
            }
        }, 3000)
    }

    componentDidMount() {
        console.log('players score', this.props.players)
        this.updateScore()
    }

    

    render(){
        return(
            <div class="main-score">
                <div class="score">
                    <span>{this.state.grupo1}</span><span>{this.state.grupo2}</span>
                </div>
                <div class="team">
                    <span>{this.state.usrG1}</span><span>{this.state.usrG2}</span>
                </div>
            </div>

        )
    }
}