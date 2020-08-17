import React from "react";
import "./Score.scss"
export default class Score extends React.Component{
    
    render(){
        return(
            <div>
                Grupo: 2 {this.props.players[0]} {this.props.players[2]}
                Grupo2: {this.props.players[1]} {this.props.players[3]}
            </div>

        )
    }
}