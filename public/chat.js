$(document).ready(function() {
    var messages = [];
    var socket = io.connect('http://192.241.186.57:1337');
    var field = document.getElementById("message");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");

    function sendMessage() {
        if(name.value == "") {
            alert("Please type your name!");
        } else {
            var text = field.value;
            socket.emit('send', { message: text, username: name.value });
            field.value = "";
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
            console.log("There is a problem:", data);
        }
    });

    sendButton.onclick = function() {
        sendMessage();
    };

    $("#message").keyup(function(e) {
        if(e.keyCode == 13) {
            sendMessage();
        }
    });
});