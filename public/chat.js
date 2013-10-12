$(document).ready(function() {
    var ip = '127.0.0.1';
    var port = '1234';
    var socket = io.connect('http://' + ip + ':' + port);

    var messages = [];
    var field = $('#message');
    var sendButton = $('#send');
    var content = $('#content');
    var name = $('#name');

    function sendMessage() {
        if(name.value == '') {
            alert('Please enter your name.');
        } else {
            var text = field.value;
            socket.emit('send', { message: text, username: name.value });
            field.value = '';
        }
    }

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html;
            content.scrollTop = content.scrollHeight;
        } else {
            console.log('Error encountered', data);
        }
    });

    sendButton.click(function() {
        sendMessage();
    })

    field.keyup(function(e) {
        if(e.keyCode == 13) {
            sendMessage();
        }
    });
});