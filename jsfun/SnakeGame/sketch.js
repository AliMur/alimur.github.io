class Snake {
  constructor(posx,posy,size) {
	this.size = size;
    this.snakeBody = [createVector(posx, posy)];	// an array of x,y coordinates that represent the snake's body
	this.direction = createVector(0, 0);	// x = 1 means right, x = -1 means left, y=1 means up , y = -1 means down
  }

  
  updatePosition() {
	  var temp1 = this.snakeBody[0].copy();
	  this.snakeBody[0].add(p5.Vector.mult(this.direction, this.size ));
	  //this.snakeBody[0].add(this.direction);
      for (var i = 1; i < this.snakeBody.length; i++) {
/*		  
		var diff = p5.Vector.sub(temp1,this.snakeBody[i]);
		if(Math.abs(diff.x) <= this.size && Math.abs(diff.y)<this.size ){
			break;
		}
*/
		var temp2 = this.snakeBody[i];
		this.snakeBody[i] = temp1;
		temp1 = temp2;
      }
  }
  
  draw(){
	  this.updatePosition();
	  for (var i = 0; i < this.snakeBody.length; i++) {
		  ellipse(this.snakeBody[i].x, this.snakeBody[i].y, this.size , this.size );
	  }
  }
  
  grow(){
	  var last = this.snakeBody[this.snakeBody.length-1].copy();
	  last.sub( p5.Vector.mult(this.direction, this.size ));
	  this.snakeBody.push(last);
  }
  
  changeDirection(up,down,left,right){
	  var x = 0;
	  var y = 0;
	  if(up){
		  y = -1;
	  }else if(down){
		  y = 1;
	  }else{
		  y=0;
	  }
	  
	  if(y==0){
		  if(right){
			  x = 1;
		  }else if(left){
			  x = -1;
		  }else{
			  x=0;
		  } 
	  }

	  if(x==0 && y==0){
		  return;
	  }
	  
	  this.direction = createVector(x, y);
  }
}

var snake;
var snake_size = 10;
function setup() {
  canvasSize = 400;
  createCanvas(canvasSize, canvasSize);
  snake = new Snake(canvasSize/2,canvasSize/2,snake_size);
  frameRate(5);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    snake.changeDirection(false,false,true,false);
  } else if (keyCode === RIGHT_ARROW) {
    snake.changeDirection(false,false,false,true);
  } else if (keyCode === UP_ARROW) {
    snake.changeDirection(true,false,false,false);
  } else if (keyCode === DOWN_ARROW) {
    snake.changeDirection(false,true,false,false);
  } else if (keyCode == 13) {
    snake.grow();
  }
  

}

function draw() {
	background(000);
	snake.draw();	
}