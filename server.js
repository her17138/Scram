
// app.get('/', (req, res) => res.send("HELLO FROM EXPRESS"));
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const open = require('open')
const formatMessage = require('./src/backend/messages');
let  app = express()
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
  } = require('./src/backend/users');
  const botName = 'ChatCord Bot';

  // Run when client connects
  io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
      const user = userJoin(socket.id, username, room);
  
      socket.join(user.room);
  
      // Welcome current user
      socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));
  
      // Broadcast when a user connects
      socket.broadcast
        .to(user.room)
        .emit(
          'message',
          formatMessage(botName, `${user.username} has joined the chat`)
        );
  
      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    });
  
    // Listen for chatMessage
    socket.on('chatMessage', msg => {
      const user = getCurrentUser(socket.id);
  
      io.to(user.room).emit('message', formatMessage(user.username, msg));
    });
  
    // Runs when client disconnects
    socket.on('disconnect', () => {
      const user = userLeave(socket.id);
  
      if (user) {
        io.to(user.room).emit(
          'message',
          formatMessage(botName, `${user.username} has left the chat`)
        );
  
        // Send users and room info
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room)
        });
      }
    });
  });
  
const PORT = process.env.PORT || 3000;
  
// server.listen(PORT, function (error) {
//     if(error) {
//         console.log(error);
//     } else {
//         console.log(`Server running on port ${PORT}`)
//         open(`http://localhost:${PORT}`)
//     }
// });
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  