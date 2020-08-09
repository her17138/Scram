import React from "react";
import "./Board.scss";
import Card from "../card/Card.jsx";
import Player from "../player/Player.jsx";
import funcs from '../utilities';


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      litter: [],
      array: [],
      images: []
    }
  }
  componentWillMount(){
    var images = funcs.importImages()
    console.log(images)
  }
  componentDidMount(){
    // card init - amount of cards to be rendered..
    let array_v2 = [];
    for (let i = 0; i < 5; i++) {
      array_v2.push(i);
    }
    this.setState({array:array_v2})
  }
  render() {
    //card litter. Should start with 0 cards.
    // const [litter, setLitter] = useState([]);
    return (
      <div className="board">
        <div className="deck">
          {this.state.array.map((x) => (
            <Card
              key={x}
              class="target"
              img={this.images[funcs.randomIndex(this.images)].default}
              number={0}
            ></Card>
          ))}
          
        </div>
        <Player name={"fran"}></Player>
        <div className="litter">
          {this.state.array.map((x) => (
            <Card
              key={x}
              class="target"
              img={this.images[funcs.randomIndex(this.images)].default}
              number={0}
            ></Card>
          ))}
        </div>
      </div>

    );
  }
}

export default Board;