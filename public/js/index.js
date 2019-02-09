//Client Side JS

var socket = io();


socket.on('connect', function (){
    console.log('Client: Connected to server')

    socket.emit('createMessage', {
        from: 'createMessageSender',
        text: 'This is text from me'
    })
 

})

//fires when connection drops
socket.on('disconnect', function(){
    console.log('Client: Disconnected from server!');
})

//custom event handler
//The data that was emitted from the server along with the event is provided as the first argument to your callback function
socket.on('newEmail', function (email) {
    console.log('New email', email);
})
