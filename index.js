// Our DB bindings, made by Alexis Hogue
const DB = new (require('chatbox-db'))();

// USER_DB
const USER_HEAP = require('./user_db/index')

// Server modules
const Logger = require('./logger/index');

const express = require('express');
const socket = require('socket.io');
const http = require('node:http');

// Create http server and socket.io server
const app = express();
const server = http.createServer(app);
const io = new socket.Server(server);

const user_heap = new USER_HEAP();

// LISTENER EVENTS
io.on('connection', (socket) => {
  
  socket.on('login', (data) => {
    // User just logged in!
    try { 

      if (!user_heap.exists(data.username)) 
        user_heap.addUser(data);
    
      DB.load(data.Channel);

      socket.join(data.Channel);
  
      Logger.userJoin(data);

      socket.emit('loginResponse', { 
        invalid: false,
        data: DB.getMessages(data.Channel)
      });


      DB.save(data.Channel);

    } catch(e) {console.log(e)}

  })

  socket.on('sendMessage', (msg) => {
    // Client sent a message!
    let user = user_heap.getUser(msg.username);
    socket
      .to(user.Channel)
      .emit('postMessage', msg);


    Logger.user(msg);
    
    DB.addMessage(user.Channel, msg);
    DB.save(user.Channel);
  })

})

// SERVER LISTEN
server.listen(3000, () => {
  console.log(`\x1b[92m --- CHATBOX SERVER ON --- \x1b[0m`);
  console.log(`http://127.0.0.1:3000`);
})

