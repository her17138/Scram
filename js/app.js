import React from "react";
import ReactDOM from "react-dom";
import Index from '../public/Index.jsx'

const App = () => {
 
  return (
    <div>Hello React,Webpack 4 & Babel 7!
        <Index />
      
    </div>
    
  )
  
};

ReactDOM.render(<App />, document.getElementById('app'));
