/**
 * implementación de reglas del juego 
 */
// var trump = null
// var tricks = []
// var turn = -1
// var deck = initDeck()
// var moves = []
var room_variables = []
module.exports = {
    initDeck,
    setTrump,
    getTrump,
    getHigherCard,
    getTrickWinner,
    calculateGroupScore,
    playerTurn,
    initRoom,
    getDeck,
    getMoves,
    getTricks,
    setMove,
    initVariables
}
function initVariables(){
    room_variables.push({
        trump: [],
        tricks: [],
        turn: 0,
        moves: []
    })

}
function initRoom(){
    const new_room_number = room_variables.length-1
    room_variables.push({
        trump: [],
        tricks: [],
        turn: 0,
        deck: initDeck(new_room_number),
        moves: []
    })
}
function initDeck(room){
    let temp_arr = [...Array(52).keys()]
    var values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
    let arr = []    
    temp_arr.forEach(x => arr.push(values[x%13]))
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
    room_variables[room].deck = cards
    room_variables[room].trump = cards[cards.length-1]
    return cards
  }

function setMove(room,move){
    room_variables[room].moves.push(move)
    if(room_variables[room].moves.length ===4){
        // parseo de arreay a objeto 
        console.log(room_variables[room].moves)
        const moves_json = {0: 0, 1: 1, 2: 0, 3: 0}
        for (var key in moves_json) {
            var index = Number(key)
            moves_json[key] = room_variables[room].moves[index].username
        }
        highercard = getHigherCard(room, moves_json)
        console.log("higher card setmove", highercard, "moves json", moves_json)
        return highercard
    }

    return -1

}
function getMoves(room){
    // console.log("getmoves room", room)
    console.log("getmoves on referee", room_variables[room].moves)
    const moves = room_variables[room].moves.length
    if(moves === 4){
        room_variables[room].moves = []
        setTrump(room)
    }
    return moves
}
function getTricks(room){
    return room_variables[room].tricks.length
}

function setTrump(room){
    console.log("room vars",room_variables[room])
    const deck = room_variables[room].deck
    var trump = deck[Math.floor(Math.random() * 52)]
    room_variables[room].trump = trump
    console.log("server trumpcard", room_variables[room].trump)
    return room_variables[room].trump
}

function getTrump(room){
    return room_variables[room].trump
}

function getKeyByValue(object, value) {
return Object.keys(object).find(key => object[key] === value);
}

function removeItemFromArr ( arr, item ) {
    var i = arr.indexOf( item );
 
    if ( i !== -1 ) {
        arr.splice( i, 1 );
    }

    return arr
}

function getHigherCard(room,data){
    console.log("data ghc", data)
    const initial_cards = Object.values(data)
    var cards = []

    //convertir de data = {username1: {value: '2', type:'diamonds'}, ...}
    //cards =[["heart","0"],["heart","3"],["heart","A"],["x","B"]]
    for (i = 0; i < initial_cards.length; i++) {
        var temp = []
        temp.push(initial_cards[i].value)
        temp.push(initial_cards[i].type)
        cards.push(temp)
    }


    var cplayed = [];
    var cards_map = [];
    var cards_map_duplicated = [];
    var maxCardIndex = -1;
    //validar si van a mandar los numeros como ints o como strings desde el frontend
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
        

    isTrump = true
    const trump = getTrump(room).type;
    console.log("ghc trump", trump)

    console.log('cards', cards)

    cards.forEach(element =>
        cplayed.push(element[0])
    );

    console.log('cplayed', cplayed)

    cplayed.forEach(element => cards_map.push(Number(getKeyByValue(values,element))));
    cards_map_duplicated = Array.from(cards_map)
    console.log('cards_map', cards_map)

    while (isTrump){
        console.log('iniciando el while', cards_map)
        maxCardIndex = cards_map.indexOf(Math.max(...cards_map));
        console.log('max_card_index', maxCardIndex)
        if(maxCardIndex === -1){
            console.log("saliendo del while no encontro trump", trump)
            break;
        } else {
            trump_card = cards[maxCardIndex][1]
            console.log("ghc trump card", trump_card)
            if (trump_card == trump){
                isTrump = false
            } else { 
                cards_map = removeItemFromArr( cards_map, cards_map[maxCardIndex] );
                console.log('al eliminar el card que no es igual al trump', cards_map)
            }
        }
    }
    if(maxCardIndex === -1){
        maxCardIndex = cards_map_duplicated.indexOf(Math.max(...cards_map_duplicated));
        console.log("maxcard index if -1", maxCardIndex, "cards_map_duplicated", cards_map_duplicated)
        return maxCardIndex;
    } else {
        return maxCardIndex;

    }
    
}

//players se veria  asi:
// players = ["Juan", "Pedro", "Luis", "Hee"]
// index es el valor que getHigherCard devuelve
function getTrickWinner(room, players, index){
    room_variables[room].tricks.push(index)
    // console.log("gettrickwinner ref", players)
    return players[index].username;
}

function calculateGroupScore(room){
    let g1 = 0,
        g2 = 0
    for (i = 0; i < tricks.length; i++) {
        if(tricks[i] % 2 == 0){
            g1 +=1
        }
        else{
            g2 +=1
        }
    }
    if(g1 >g2){
        return ["grupo1", g1]
    }
    else{
        return ["grupo2", g2]
    }
}
function playerTurn(room,players){
    if(room_variables[room].tricks.length !== 13){
        room_variables[room].turn +=1
        console.log("turn #", room_variables[room].turn)
        // console.log("player list", players, "turn #", room_variables[room].turn % 4)
        console.log('server returns playerturn', players[room_variables[room].turn % 4].username)
        return players[room_variables[room].turn % 4].username
    }
    return null
}
function getDeck(room){
    return room_variables[room].deck
}


