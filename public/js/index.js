//Client Side JS

var socket = io();


socket.on('connect', function (){
    console.log('Client: Connected to server')


})

//fires when connection drops
socket.on('disconnect', function(){
    console.log('Client: Disconnected from server!');
})

//custom event handler
//The data that was emitted from the server along with the event is provided as the first argument to your callback function
socket.on('newMessage', function (message) {
    console.log('New message', message);

    //rather than selecting an element, we are going to create and element and then modify that element and add it into the markup, making it visable
    var li = jQuery('<li></li>')
    li.text(`${message.from}: ${message.text}`);

    //To render on the DOM
    jQuery('#messages').append(li)
})




jQuery('#message-form').on('submit', function(e) {
    // prevents defult behavior for the event, the default event for sumbit is the refresh page event
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        // going to select any name attribute equal to message
        text: jQuery('[name=message]').val()
        //Need to include a callback for the event acknowlegdement
    }, function () {

    })
})
