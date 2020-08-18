const PORT = process.env.PORT || 3000;
const path = require("path");
const express = require("express");
const WebSocket = require('ws')
const SocketServer = WebSocket.Server
let app = express();
const server = app.listen(PORT, () => console.log(`Server running on ws://localhost:${PORT}`));
const wss = new SocketServer({server})

const { 
  getTrickWinner,
  calculateGroupScore,
  playerTurn,
  initRoom,
  getDeck,
  getMoves,
  getTricks,
  setMove, 
  initVariables,
  getTrump} = require('./src/js/referee')
initVariables()



app.use(express.static(path.join(__dirname, "public")));


const formatMessage = require("./src/js/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  getUserRoom,
} = require("./src/js/users");

const botName = "Whist Chat";

/**
 * users = [
 *      {id: 'socketid', username:'user', room: '1', points: '0'}
 * ]
 */

/**
 * rooms = [
 *      //room 1
 *      [{user1}, {user2}, ...],
 *      //room 2
 *      [{user5}, {user6}, ...],
 * ]
 */
let rooms = [];
/**
 *  action types and (send) message structure (cada mensaje que **envie** el cliente debe llevar la
 *  siguiente estructura):
 *      1. join_room : action||username
 *      2. send_message : action||username||message
 *      3. receive_message : action||message
 *      4. send_players : action||players
 *      5. init_deck : action||deck
 *      6. trick_winner : action||winner_index
 *      7. game_over : action||winner_data
 */

// Run when client connects
// app.ws("/", (ws, req) => {
wss.on('connection',  (ws) => {
  ws.on("message", function (message) {
    msg = message.split("||");
    action = msg[0];
    let new_player = null;
    var usr_room = -1
    switch (action) {
      case "join_room":
        // check if room has available space
        let last_rm = rooms[rooms.length - 1];
        if (!last_rm) {
          initRoom()
          new_player = userJoin(ws, msg[1], rooms.length + 1, 0);
          rooms.push([new_player]);
        } else if (last_rm.length < 4) {
          //has space
          new_player = userJoin(ws, msg[1], rooms.length, 0);
          last_rm.push(new_player);
        } else {
          // room full, create new one
          initRoom()
          new_player = userJoin(ws, msg[1], rooms.length + 1, 0);
          rooms.push([new_player]);
        }
        //esto fue lo que yo agregue 
        ws.send(["join_room", new_player["room"]].join("||"));
        // welcome user
        ws.send(
          [
              "receive_message", 
              JSON.stringify(formatMessage(botName, "¡Bienvenido!"))
            ].join("||")
        );
        
        // broadcast to all room users
        let room_plyrs = rooms[rooms.length - 1];
        // console.log(JSON.stringify(room_plyrs))
        const usrs = room_plyrs.map(x => x.username)
        for (let i = 0; i < room_plyrs.length; i++) {
          let usr_socket = room_plyrs[i].id;
          usr_socket.send(['send_players', JSON.stringify(usrs)].join("||"))
          if(room_plyrs[i].id !== new_player.id){
            usr_socket.send(
              [
                "receive_message",
                JSON.stringify(formatMessage(botName, msg[1] + " se ha unido al chat.")),
              ].join("||")
            );
          }
        }
        break;
      case "send_message":
        let player_usr = msg[1];
        let message = msg[2];
        usr_room = getUserRoom(player_usr) -1;
        // console.log(msg)
        for (let i = 0; i < rooms[usr_room].length; i++) {
          let usr_socket = rooms[usr_room][i].id;
          usr_socket.send(
            ["receive_message", JSON.stringify(formatMessage(player_usr, message))].join("||")
          );
        }
        break;
      case "get_players":
        usr_room = msg[1]
        const rm_players = getRoomUsers(Number(usr_room))
        const usernames = rm_players.map(x => x.username)
        ws.send(['send_players', JSON.stringify(usernames)].join("||"))
        break;
      case "init_deck":
        ws.send(["init_deck", JSON.stringify(getDeck(getUserRoom(getCurrentUser(ws).username)))].join("||"))
        break;
      case "make_move":
        const move = JSON.parse(msg[1])
        const user_name = getCurrentUser(ws).username
        var this_room = getUserRoom(user_name) -1
        var room_users = getRoomUsers(this_room+1)
        // hacer movimiento 
        const max_index = setMove(this_room,move)
        // console.log("max_index", max_index, "move", move, "room", this_room)
        // console.log("getmoves", getMoves(this_room))
        // verificar si ya se hicieron los 4 moves, si sí, enviar el ganador del trick 
        const moves_made = getMoves(this_room)
        console.log("server getmoves", moves_made)
        const ply_turn = playerTurn(this_room, room_users)
        if(moves_made === 4){
          const trick_winner = getTrickWinner(this_room,room_users, max_index)
          for (let i = 0; i < room_users.length; i++) {
            let usr_socket = room_users[i].id;
            usr_socket.send(['trick_winner', trick_winner].join("||"))
            usr_socket.send(['get_trump', JSON.stringify(getTrump(this_room))].join("||"))
            // de paso, verificar si se termino el juego 
            if(getTricks(this_room) == 13){
              usr_socket.send(['game_over', JSON.stringify(calculateGroupScore(this_room))].join("||"))
            }
            usr_socket.send(['get_move', JSON.stringify(move)].join("||"))
            usr_socket.send(["whos_turn", ply_turn].join("||"))
          }
        }
        // si no, solo hacer broadcast al movimiento 
        else {
          // console.log("ELSE MAKE MOVE room users", room_users, "room", this_room)
          console.log("ELSE MAKE MOVE player turn", ply_turn)
          for (let i = 0; i < room_users.length; i++) {
            let usr_socket = room_users[i].id;
            usr_socket.send(['get_move', JSON.stringify(move)].join("||"))
            usr_socket.send(["whos_turn", ply_turn].join("||"))
          }
        }
        
        break;
      // case 'whos_turn':
      //   // se envia el username del jugador al que le toca
      //   // si el juego ya termino, whos_turn devuelve null
      //   ws.send(["whos_turn", playerTurn(this_room,room_users)].join("||"))
      //   break;
      case "disconnect":
        const user = userLeave(getCurrentUser(ws).id);
        // broadcast to all room users
        // console.log("userleave user", user)
        let room_usrs = rooms[user.room -1];
        if (room_usrs){
          //eliminar del room al usuario 
          const index = room_usrs.findIndex(usr => usr.id === user.id);
          if (index !== -1) {
            room_usrs.splice(index, 1)[0];
          }
          const rm_usrs = room_usrs.map(x => x.username)
          // avisar a todos los usuarios que se ha desconectado
          for (let i = 0; i < room_usrs.length; i++) {
            let usr_socket = room_usrs[i].id;
            usr_socket.send(
              [
                "receive_message",
                JSON.stringify(formatMessage(botName, user.username + " ha salido del chat.")),
              ].join("||")
            );
            console.log('room users after exit', rm_usrs)
            usr_socket.send(['send_players', JSON.stringify(rm_usrs)].join("||"))
          }
        }
        user.id.close()
        break;
    }
  });
  ws.on("close", function (message) {
    console.log("[SERVER] client disconnected")
  })
});
