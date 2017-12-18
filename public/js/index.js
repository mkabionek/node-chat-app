var socket = io();
var rooms = [];
var joinButton = $('#join');
var sendButton = $('#send');
var nick = '';
var room = '';


joinButton.on('click', function(e){
    e.preventDefault();
    $(this).prop('disabled', true);
    nick = $('[name=name]').val();
    room = $('[name=room]').val();
    
    if(nick.length != 0 && room.length != 0){
        
        socket.emit('join', room, function(err){
            if(err){

            }else{
                $('#chat').fadeIn(100);
                $('#chat_choose').fadeOut(100);
            }
        });
    }else{
        $(this).prop('disabled', false);
    }
});

sendButton.on('click', function(e){
    e.preventDefault();
    
    socket.emit('createMessage', {
        room: room,
        from: nick,
        text: $('[name=message]').val()
    }, function(){
        console.log('Message sent');
     });

});


socket.on('connect', function() {
    console.log('display room list', rooms);
});


socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li)
});


socket.on('returnRooms', function (message) {
    console.log(message);
    rooms = message.rooms;
});