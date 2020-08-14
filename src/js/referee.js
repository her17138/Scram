/**
 * implementación de reglas del juego 
 */

module.exports = {
    initDeck,
    setTrump,
    getTrump,
    getHigherCard,
    getTrickWinner,
    calculateScore
}
function initDeck(){
    let temp_arr = [...Array(52).keys()]
    var values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
    let arr = []
    temp_arr.forEach(x => arr.push(values[x%13]))
    // temp_arr = temp_arr.map(x => (x %14) > 0 && ((x+1) %14) > 0 ? values[(x+1) % 14] 
    //     : (x %14) === 13 ? values[14] : values[0])

    /**
     * asignar valores reales a numeros del deck 
     * 1-13: spades 
     * 14-26: clubs
     * 27-39: diamonds
     * 40-52: hearts 
     */
    let c_types = [...Array(13).fill("spades")].concat(Array(13).fill("clubs"), Array(13).fill("diamonds"), Array(13).fill("hearts"))
    // console.log(c_types) 
    let cards = temp_arr.map(x => JSON.parse(`{"value": "${arr[x]}", "type": "${c_types[temp_arr.indexOf(x)]}"}`))
    console.log(cards)
    // randomize deck
    let currentIndex = temp_arr.length,
        temporaryValue,
        randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
    return cards
}

function setTrump(trump){

}

function getTrump(){
    return trump;
}

function getKeyByValue(object, value) {
return Object.keys(object).find(key => object[key] === value);
}

function getHigherCard(cards){
    var cplayed = [];
    var cards_map = [];
    var maxCardIndex = -1;
    //validar si van a mandar los numeros como ints o como strings desde el frontend
    // en la baraja inglesa no hay un 0 (!)
    var values = {
    14: 'A',
    13: 'K',
    12: 'Q',
    11: 'J',
    10: '10',
    9: '9',
    8: '8',
    7: '7',
    6: '6',
    5: '5',
    4: '4',
    3: '3',
    2: '2',
    0: '0'      
    };
    
    //asumiendo que cards es un array que se ve asi:
    // cards =[["men","0"],["hola","3"],["pedro","A"],["luis","B"]]

    
    cards.forEach(element =>
        cplayed.push(element[1])
    );

//haria falta analizar el trump en caso que venga de lo contrario si se manda como 
//0 no hace falta
    cplayed.forEach(element => cards_map.push(Number(getKeyByValue(values,element))));
    maxCardIndex = cards_map.indexOf(Math.max(...cards_map));
    return maxCardIndex;
}


//players se veria  asi:
// players = ["Juan", "Pedro", "Luis", "Hee"]
// index es el valor que getHigherCard devuelve
function getTrickWinner(players, index){
return players[index];
}


function calculateScore(){

}


