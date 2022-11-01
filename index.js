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
    this.users[data.username] = data;
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
    try { 
    user_heap.addUser(data);
    socket.join(data.Channel);
    console.log(user_heap);
    console.log('User logged in');


    socket.emit('loginResponse', DB.getMessages(data.Channel));
    } catch(e) {console.log(e)}
  })

  socket.on('sendMessage', (msg) => {
    // Client sent a message!
    console.log('New message', msg);
    DB.addMessage(user_heap.getUser(msg.username).Channel, msg);

    if (!Object.keys(user_heap.users).includes(msg.username)) {
      user_heap.addUser({username:'BOT'});
    }

    socket
      .to(user_heap.getUser(msg.username).Channel)
      .emit('postMessage', msg);
  })

  /*
  socket.on('myOtherEvent', (msg) => {
     
    // Do something when `myOtherEvent` is triggered by a client
  
  }) */

})

// SERVER LISTEN
server.listen(3000, () => {
  console.log(`http://10.0.0.1:3000`);
})

