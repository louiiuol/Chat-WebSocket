const app = require("express")(),
  server = require("http").createServer(app),
  io = require("socket.io").listen(server);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
})

io.sockets.on('connection', (socket) => {
  socket.on("new_user", (nickname) => {
    socket.nickname = nickname;
    socket.broadcast.emit("new_user", nickname);
  });

  socket.on("message", (message) => {
    socket.broadcast.emit("message", {nickname : socket.nickname, message : message});
  });

  socket.on('typing', function () {
    socket.broadcast.emit('typing', {nickname : socket.nickname});
  });

});

server.listen(8080);
console.log("application started with success!");