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
        socket.emit('join', {user: nick, room: room}, function(err){
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
    var messageInput = $('[name=message]');
    
    socket.emit('createMessage', {
        room: room,
        from: nick,
        text: messageInput.val()
    }, function(){
        console.log('Message sent');
        messageInput.val('');
     });

});


socket.on('connect', function() {
    console.log('display room list', rooms);
});


socket.on('newMessage', function (message) {

    var msg = $('<div class="message"></div>');
    var h = $('<div class="head"></div>');
    var from = $('<span class="from"></span>');
    from.text(message.from);
    
    var time = $('<span class="time"></span>');
    time.text('12:00');
    h.append(from,time);
    var body = $('<p class="body"></p>');
    body.text(message.text);
    msg.append(h);
    msg.append(body);
    $('.messages').append(msg);
});


socket.on('returnRooms', function (message) {
    console.log(message);
    rooms = message.rooms;
});