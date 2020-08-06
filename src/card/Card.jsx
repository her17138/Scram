import React, {useState, useEffect} from 'react';
import backImage from "../../assets/back.jpg"
import './Card.css'
export default function Card(props){
    //aqui declaras tu variable, flip y llamas la funcion setFlip(param) para cambiar su valor.
    const [flipped, setFlip] = useState(false)
    const [stack, setStack] = useState([])

    function handleClick(e){
        e.preventDefault()
        setFlip(prevVal => !prevVal)
    }
    return(
        <div className="card" onClick={(e) => {handleClick(e)}} >
            {flipped ?  <img className="cardImg" src={props.img}></img> : <img className="cardImg" src = {backImage}></img>}
        </div>
    )
}