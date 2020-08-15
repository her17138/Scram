
import React from "react";
import Index from './Index.jsx';
import Game from './game/Game.jsx';
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"

const App = () => {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Index}/>
          <Route path="/game" component={Game}/>
        </div>
      </Router>
    );
    
}

ReactDOM.render(<App />, document.querySelector("#root"));