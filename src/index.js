import React from "react";
import ReactDOM from "react-dom";

import Board from './board/Board.jsx';
const App = () => {
 
  return (
    <div>Hello React,Webpack 4 & Babel 7!
        <Board>
          
          
        </Board>
        
      
    </div>
    
  )
  
};

ReactDOM.render(<App />, document.querySelector("#root"));