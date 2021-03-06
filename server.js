var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
let port = 8080

var numClients = 0;

var randomHelloPhrases = [
    'Haaa hello!!!',
    'Chan chan, welcome to the counter',
    'Ding ding!!!',
    'Phenomenal. We are more now.',
    'Are you sure you want to be here?',
]

var randomByePhrases = [
    'NooOoooO now we are one less',
    'You will always regret this.',
    'The unforgiven has left',
    'Bye! Do not forget to love us!',
    'Close the door while leaving',
]

io.on('connection', function(socket) {
    numClients++;
    let messageNumber = Math.floor(Math.random() * 5);
    io.emit('stats', { numClients: numClients, message: randomHelloPhrases[messageNumber] });

    socket.on('disconnect', function() {
        numClients--;
        let messageNumber = Math.floor(Math.random() * 5);
        io.emit('stats', { numClients: numClients, message: randomByePhrases[messageNumber] });
    });

    socket.on('chat', function(data) {
        io.emit('chat', { chat: data.nickname + ':' + ' ' + data.message });
    });  
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(port);
console.log('magic happens at port ' + port)