const express = require('express')
const path = require('path');
const port = process.env.PORT || 5000
const exphbs = require('express-handlebars');
const socketIO = require('socket.io');
const http = require('http');
//we need to use http ourselves and configure it with express
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users')

var app = express();

var server = http.createServer(app)
var io = socketIO(server) //This is our websocket server, how we communicate between server and client
var users = new Users ();



const publicPath = path.join(__dirname, '../public/');
app.use(express.static(publicPath))
require('dotenv').config();
require('./data/database');

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');
app.use(require('cookie-parser')());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//lets you register an event listener
// built in event listener like connection lets you listen when a client connects to the server
// 'socket' which is passed into the callback represents the individual socket as opposed to all the users connected to the server
io.on('connection', (socket) => {
    console.log('Server: new user connected');


    //socket.emit is not a listener. Instead of listening to an event, we are creating the event
    //first argument is the event that we are creating, then we send any data back to the client along with the new event

    //callback handles the event acknowlegdements
    //Check for real strings in params, if not use callback
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
          return callback('Name and room name are required.');
        }

        

        socket.join(params.room);
        users.removeUser(socket.id);//remove them from any other rooms that they may be involved in

        users.addUser(socket.id, params.name, params.room);

        //socket.leave(params.room)

        // io.emit emits to every connected users --> io.to(params.room).emit: Sends event to everyone connected in a room
        // socket.broadcast.emit emits to everyone on server except current user --> socket.broadcast.to(params.room).emit: send event to everyone in room except current user
        // socket.emit emits an event to specifically one user

        //Welcome from admin
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

        //Always calling the callback, just no arguments because we dont want to pass any errors back
        callback()
    });

    //listener
    socket.on('createMessage', (message, callback) => {
        console.log("created message", message);

        // socket.emit emits to a single connection, io.emit emits to all connections
        io.emit('newMessage', generateMessage(message.from, message.text))

        //Send an event back to the frontend
        callback();

        // To broadcast, we need to specify the individual socket. This lets the socket.io library know which users shouldn't get the event
        // Will socket.broadcast.emit send event to everyone except this socket
        // createdAt: new Date().getTime()//may want to use this to sort messages in a chatroom

    })

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    })


    socket.on('disconnect', () => {
        console.log('User has been disconnected from the server');

    })
})




server.listen(port, () => {
    console.log(`Server is up on ${port}`);
})
