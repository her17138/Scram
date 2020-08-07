import React, {useState, useEffect} from 'react';
import backImage from "../../assets/back.jpg"
import './Card.scss'

//  La carta deberia contener (en props supongo)...
//      - Imagen
//      - Tipo de carta
//      - Subtipo de Carta
//      - Puntos
//      - Texto (description)
//      - Stack info

// En base a tipo y subtipo se pone la funcionalidad supongo
//      En base a los puntos al parecer tambien cambian los efectos

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
            <div className="cardDetails">
                <div className="cardPoints">{this.props.cardPts}</div>
                <div className="cardDesc">{this.props.cardDesc}</div>
            </div>
        </div>
    )
}