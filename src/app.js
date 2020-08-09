import React from "react";
import ReactDOM from "react-dom";
import Index from './Index.jsx'
import Board from './board/Board.jsx';
const App = () => {
 
  return (
    <div> 
        <Index />
        <Board />
    </div>
    
  )
  
};

ReactDOM.render(<App />, document.querySelector("#root"));