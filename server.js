const PORT = process.env.PORT || 3000;
const path = require("path");
const http = require("http");
const express = require("express");
const enableWs = require("express-ws");

let app = express();
//initialize a simple http server
// const server = http.createServer(app);
// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port:PORT });
// const wsInstance = enableWs(app, wss);
// enableWs(app);


const WebSocket = require('ws');
// const wss = new WebSocket.Server({ server });
// const wsInstance = enableWs(app, wss);
const server = http.createServer(app);
const wss = new WebSocket.Server({ server })

app.use(express.static(path.join(__dirname, "public")));

const formatMessage = require("./src/js/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  getUserRoom,
} = require("./src/js/users");

const ref = require('./src/js/referee')
const botName = "ChatCord Bot";

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
 *      3. disconnect : action||username
 *      4. receive_message : action||message
 *      5. send_players : action||players
 */

// Run when client connects
// app.ws("/", (ws, req) => {
wss.on('connection', function connection(ws) {
  ws.on("message", function incoming(message) {
    msg = message.split("||");
    action = msg[0];
    let new_player = null;
    switch (action) {
      case "join_room":
        // check if room has available space
        let last_rm = rooms[rooms.length - 1];
        if (!last_rm) {
          new_player = userJoin(ws, msg[1], rooms.length + 1, 0);
          rooms.push([new_player]);
        } else if (last_rm.length < 4) {
          //has space
          new_player = userJoin(ws, msg[1], rooms.length, 0);
          last_rm.push(new_player);
        } else {
          // room full, create new one
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
          if(room_plyrs[i].id !== new_player.id){
            usr_socket.send(['send_players', JSON.stringify(usrs)].join("||"))
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
        var room = getUserRoom(player_usr) -1;
        for (let i = 0; i < rooms[room].length; i++) {
          let usr_socket = rooms[room][i].id;
          usr_socket.send(
            ["receive_message", JSON.stringify(formatMessage(player_usr, message))].join("||")
          );
        }
        break;
      case "get_players":
        var room = msg[1]
        const rm_players = getRoomUsers(Number(room))
        const usernames = rm_players.map(x => x.username)
        ws.send(['send_players', JSON.stringify(usernames)].join("||"))
        break;
      case "send_trick_winner":
        break;
      case "disconnect":
        const user = userLeave(msg[1]);
        // broadcast to all room users
        let room_usrs = rooms[user.room];
        if (room_usrs){
          //eliminar del room al usuario 
          const index = room_usrs.findIndex(usr => usr.id === user.id);
          if (index !== -1) {
            return room_usrs.splice(index, 1)[0];
          }
          const rm_usrs = room_usrs.map(x => x.username)
          console.log(rm_usrs)
          for (let i = 0; i < room_usrs.length; i++) {
            let usr_socket = room_usrs[i].id;
            if(usr_socket !== user.id){
              usr_socket.send(
                [
                  "receive_message",
                  JSON.stringify(formatMessage(botName, msg[1] + " ha salido del chat.")),
                ].join("||")
              );
              usr_socket.send(['send_players', JSON.stringify(rm_usrs)].join("||"))
            }
          }
        }
        user.id.send("can_disconnect")
        break;
    }
  });
  ws.on("close", function (message) {
    console.log("SERVER CONNECTION CLOSED")
  })
})

server.listen(PORT, () => console.log(`Server running on ws://localhost:${PORT}`));