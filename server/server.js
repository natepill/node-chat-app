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

    socket.on('disconnect', () => {
        console.log('User has been disconnected from the server');
    })
})


app.get('/', (req, res) => {
    console.log('sda');
})



server.listen(port, () => {
    console.log(`Server is up on ${port}`);
})
