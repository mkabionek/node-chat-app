const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var rooms = [];
app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (room, callback) => {
        socket.join(room);

        socket.emit('newMessage', generateMessage('Admin', 'Welcome'));
        socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', 'New user joined.'));
        callback();
    })

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        // socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
        io.to(message.room).emit('newMessage', generateMessage(message.from, message.text));
        // io.sockets.in(message.room).emit('newMessage', generateMessage(message.from, message.text));
        console.log(message);
        callback();
    });

    socket.on('getRooms', () => {
        socket.emit('returnRooms', {rooms: rooms});
    })

    


    
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
