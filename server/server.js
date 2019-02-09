const express = require('express')
const path = require('path');
const port = process.env.PORT || 5000
const socketIO = require('socket.io');
const http = require('http');
//we need to use http ourselves and configure it with express


var app = express();

var server = http.createServer(app)
var io = socketIO(server) //This is our websocket server, how we communicate between server and client


const publicPath = path.join(__dirname, '../public/');
app.use(express.static(publicPath))


//lets you register an event listener
// built in event listener like connection lets you listen when a client connects to the server
// 'socket' which is passed into the callback represents the individual socket as opposed to all the users connected to the server
io.on('connection', (socket) => {
    console.log('Server: new user connected');

    //Welcome from admin
    socket.emit('newMessage', {
        from: "Admin",
        text: 'welcome to the chat',
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit('newMessage', {
        from: "Admin",
        text: "New User Joined",
        createdAt: new Date().getTime()
    })

    //socket.emit is not a listener. Instead of listening to an event, we are creating the event
    //first argument is the event that we are creating, then we send any data back to the client along with the new event

    //listener
    socket.on('createEmail', (newEmail) => {
        console.log("createEmail", newEmail);
    })
    //listener
    socket.on('createMessage', function(createdMessage) {
        console.log("created message", createdMessage);

        //socket.emit emits to a single connection, io.emit emits to all connections
        // io.emit('newMessage', {
        //     from: createdMessage.from,
        //     text: createdMessage.text,
        //     createdAt: new Date().getTime() //may want to use this to sort messages in a chatroom
        // })

        // To broadcast, we need to specify the individual socket. This lets the socket.io library know which users shouldn't get the event
        // Will send event to everyone except this socket
        socket.emit.broadcast("newMessage", {
            from: createdMessage.text,
            text: createdMessage.text,
            createdAt: new Date().getTime()//may want to use this to sort messages in a chatroom
        })
    })


    socket.on('disconnect', () => {
        console.log('User has been disconnected from the server');

    })
})




server.listen(port, () => {
    console.log(`Server is up on ${port}`);
})
