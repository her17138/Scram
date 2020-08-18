

function getHigherCard(data){
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
    trump = "hearts";

    while (isTrump){
        cards.forEach(element =>
            cplayed.push(element[0])
        );

        //haria falta analizar el trump en caso que venga de lo contrario si se manda como 
        //0 no hace falta
        cplayed.forEach(element => cards_map.push(Number(getKeyByValue(values,element))));
        maxCardIndex = cards_map.indexOf(Math.max(...cards_map));

        trump_card = cards[maxCardIndex][1]
        if (trump_card == trump){
        isTrump = false
        }
    }
    
    return maxCardIndex;
}

function setMove(move){
    moves.push(move)
    
    if(moves.length ===4){
        // parseo de arreay a objeto 
        const moves_json = {0: 0, 1: 1, 2: 0, 3: 0}
        for (var key in moves_json) {
            var index = Number(key)
            moves_json[key] = moves[index].username
        }
      	
        getHigherCard(moves_json)
    }
}
  

