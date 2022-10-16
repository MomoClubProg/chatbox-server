const DB = require('chatbox-db');
const express = require('express');
const socket = require('socket.io');
const http = require('node:http');

// Create http server and socket.io server
const app = express();
const server = http.createServer(app);
const io = new socket.Server(server);

// LISTENER EVENTS
io.on('connection', (socket) => {
  
  socket.on('login', (data) => {
    // User just logged in!
  })

  socket.on('sendMessage', (msg) => {
    // Client sent a message!
    DB.addMessage(msg);
  })

  /*
  socket.on('myOtherEvent', (msg) => {
     
    // Do something when `myOtherEvent` is triggered by a client
  
  }) */

})

// SERVER LISTEN
server.listen(3000, () => {
  console.log(`http://127.0.0.1:3000`);
})

