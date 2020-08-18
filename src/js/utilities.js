
import card from "../cards.json"

const funcs = {
  randomInterval(upLimit, mycard) {
    console.log(mycard)
    return Math.floor(Math.random() * upLimit);
  } ,

  getImage(value, type){
    var cards = card.cards
    var i = 0
    for (i; i < cards.length; i++) {
      if(cards[i].value === value && cards[i].type == type){
        return i
      }

    }
    
  }
 
};


export default funcs;