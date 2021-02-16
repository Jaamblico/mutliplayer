function Player(player){
  this.x = player.x;
  this.y = player.y;
  this.id = player.id;
  this.rgb = player.rgb;
  this.speed = -1;

  this.display = function(x,y){
    fill(player.rgb.r,player.rgb.g,player.rgb.b);
    ellipse(x,y,33,33);
  }

  this.move = function(){
    var position = {
      x: this.x,
      y: this.y,
      id: this.id
    }

    if(keyIsDown(37)){
      this.x += this.speed;
      socket.emit('move', position);
    }
    if(keyIsDown(39)){
      this.x -= this.speed;
      socket.emit('move', position);
    }
    if(keyIsDown(38)){
      this.y += this.speed;
      socket.emit('move', position);
    }
    if(keyIsDown(40)){
      this.y -= this.speed;
      socket.emit('move', position);
    }
  }
}
