import React from "react";
import ReactDOM from "react-dom";
import Card from "./card/Card.jsx";
const App = () => {
  return (
    <div>Hello React,Webpack 4 & Babel 7!
      <Card img={"./assets/hans.jpeg"}></Card>
    </div>
    
  )
  
};

ReactDOM.render(<App />, document.querySelector("#root"));