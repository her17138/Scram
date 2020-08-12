/**
 * implementación de reglas del juego 
 */

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


