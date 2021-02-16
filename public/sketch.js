let socket;
let players = [];

function preload() {
  socket = io.connect("http://localhost:3000");
}

function setup() {
  createCanvas(600, 400);
  background(50);

  socket.on("hello", (serverPlayers) => {
    for (var i = 0; i < serverPlayers.length; i++) {
      let playerFromServer = serverPlayers[i];
      if (!playerExists(playerFromServer)) {
        players.push(new Player(playerFromServer));
      }
    }
  });

  socket.on("bye", (playerId) => {
    players = players.filter((player) => player.id !== playerId);
    background(50);
  });

  socket.on("move", (position) => {
    for (let i = 0; i < players.length; i++) {
      if (position.id === players[i].id) {
        players[i].x = position.x;
        players[i].y = position.y;
      }
    }
  });
}

function draw() {
  background(50);
  for (var i = 0; i < players.length; i++) {
    players[i].display(players[i].x, players[i].y);
    if (players[i].id == socket.id) {
      players[i].move();
    }
  }
}

const playerExists = (player) => {return players.includes(player);}


function mousePressed() {
  print('this.id', socket.id)
  print(players)
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// var socket
// var data;
//
// function preload(){
//   socket = io.connect('http://localhost:3000');
// }
//
// function setup() {
//   createCanvas(600,400);
//   background(50);
//   socket.on('mouse',newDrawing);
// }
//
// function newDrawing(data){
//   noStroke()
// 	fill(255,0,100);
//   ellipse(data.x,data.y,33,33);
// }
//
// function mouseDragged(){
//   console.log("Sending: " + mouseX + "," + mouseY);
//   var data = {
//     x: mouseX,
//     y: mouseY
//   }
//   socket.emit('mouse', data);
//   noStroke()
// 	fill(255);
//   ellipse(mouseX,mouseY,33,33);
// }
