// Out DB bindings, made by Alexis Hogue
const DB = require('chatbox-db');

const express = require('express');
const socket = require('socket.io');
const http = require('node:http');

// Create http server and socket.io server
const app = express();
const server = http.createServer(app);
const io = new socket.Server(server);

class USER_HEAP {

  constructor() {
    this.users = {};
  }

  addUser(data) {
    this.users[data.name] = data;
  }

  getUser(name) { 
    return this.users[name] || undefined
  }

};

const user_heap = new USER_HEAP();

// LISTENER EVENTS
io.on('connection', (socket) => {
  
  socket.on('login', (data) => {
    // User just logged in!
    let channelID = data.channelID;
    user_heap.addUser(data);
    socket.emit('loginResponse', DB.getMessages());
  })

  socket.on('sendMessage', (msg) => {
    // Client sent a message!
    DB.addMessage(msg);
    socket
      .to(user_heap.getUser(msg.username).channelID)
      .broadcast.emit('postMessage', msg);
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

