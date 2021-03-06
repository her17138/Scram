import React from "react";
import "./Trump.scss"

var ups = null
export default class Trump extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            trump:"",
        }
        
    }

    updateTrump(props) {
        ups = setInterval(() => {
            const newTrump = props.clientjs.get_trump_card()
            // console.log('new_trumo', newTrump)
            if(newTrump){
                this.setState({trump: newTrump.type})
            }
        }, 3000)
    }

    componentDidMount() {
        this.updateTrump(this.props)
    }

    

    render(){
        return(
            <div id="trump-container" className="main-score">
                <div className="trumpTitle">
                    TRUMP
                </div>
                <div className="trumpDetails">
                    <p className="trumpSubtitle">{this.state.trump}</p>
                    <div id={this.state.trump}></div>
                </div>

            </div>
        )
    }
}