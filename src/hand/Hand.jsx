import React from "react";
import Card from "../card/Card.jsx";
import Fucs from "../utilities.js";


class Hand extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentWillMount(){
    var images = await Fucs.importImages()
    console.log(images)
  }
  render() {
    return (
      <div className="hand">
        <div>{images}</div>
        {this.props.cards.map((x, i) => (
          <Card
            key={i}
            player={this.props.player}
            img={images[0].default}
            startFunction={Fucs.dragStart}
            endFunction={Fucs.dropEnd}
          ></Card>
        ))}
      </div>
    );
  }
}
export default Hand;
// img={"../../assets/" + arr[randomIndex(arr)]}
