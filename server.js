var express = require('express');
var app = express();
var server = app.listen(3000); // levanta el sv

var socket = require('socket.io');
var io = socket(server);
var players = [];

app.use(express.static('public'));
console.log("My socket server is running");

io.on('connection', (socket) => {
  console.log("new connection: " + socket.id);
  players.push(new Player(socket.id));

  io.sockets.emit('hello',players);

  socket.on("move",(position)=>{
    for(var i = 0; i<players.length;i++){
      if(players[i].id == position.id){
        players[i].x = position.x;
        players[i].y = position.y;
      }
    }
    socket.broadcast.emit("move",position);
  })

  socket.on("disconnect", () => {
    io.sockets.emit("bye", socket.id);
    console.log(socket.id + " has disconnected");
    players = players.filter(player => player.id !== socket.id);
  });
});

io.sockets.on("disconnect", socket => {
  io.sockets.emit("bye", socket.id);
  players = players.filter(player => player.id !== socket.id);
});

function Player(id){
  this.x = Math.random() * 600 + 1;
  this.y = Math.random() * 400 + 1;
  this.id = id;
  this.rgb = {
    r: Math.random() * 255,
    g: Math.random() * 255,
    b: Math.random() * 255,
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// var express = require('express');
// var app = express();
// var server = app.listen(3000);
// var socket = require('socket.io');
// var io = socket(server);
//
// app.use(express.static('public'));
// console.log("My socket server is running");
//
//
// io.sockets.on('connection',newConnection);
//
// function newConnection(socket){
//   console.log("new connection: " + socket.id);
//
//   socket.on('mouse',mouseMsg);
//
//   function mouseMsg(data){
//     socket.broadcast.emit('mouse',data);
//     //io.sockets.emit('mouse',data);
//     console.log(data);
//   }
// }
