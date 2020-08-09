import React, { useState } from "react"
import Hand from '../hand/Hand.jsx';
export default function Player(props){
const [points, setPoints] = useState(0);
const [turn, setTurn] = useState(false)


return(
    <Hand player={props.player} cards ={[0,0,0,0,0]}></Hand>
)
}