// creating a menger-sponge
// https://en.wikipedia.org/wiki/Menger_sponge

class MengerSponge {
  constructor(size, cx=0, cy=0, cz=0) {
    this.sponges = [];
    this.size = size;
    this.cx = cx;
    this.cy = cy;
    this.cz = cz;
  }

  draw() {
    if (this.sponges.length == 0) {
		//noStroke();
	push();
      translate(this.cx,this.cy,this.cz);
      box(this.size);
	  // translate back to origin
      //translate(-this.cx,-this.cy,-this.cz);
	  pop();
    } 
    else {
      for (var i = 0; i < this.sponges.length; i++) {
        this.sponges[i].draw();
      }
    }
  }
  
  split(){
    if (this.sponges.length == 0) {
      // split into 3x3x3 smaller sponges
      var nSize = this.size / 3;
      for(var x = -1; x<2 ; x++){
        var ncx = this.cx + (nSize*x);
        for(var y = -1; y<2; y++){
          var ncy = this.cy + (nSize*y);
          for(var z = -1; z<2 ; z++){
			  //var f = abs(x)^abs(y)^abs(z);
			  //if( f != 1)
				var f = abs(x)+abs(y)+abs(z);
			    //if(  f == 2)
				if(  f < 2)
				continue;
            var ncz = this.cz + (nSize*z);
            var s = new MengerSponge(nSize,ncx,ncy,ncz);
            this.sponges.push(s);
          }
        }
      }
	  console.log(this.sponges);
    }
    else {
      for (var i = 0; i < this.sponges.length; i++) {
        this.sponges[i].split();
      }
    }
  }

}

var angle;
var canvasSize;
var spongeSize;
var center;
var angle_change_rate;
var mengerSponge;

function setup() {
  angle = 0;
  angle_change_rate = 0.01;
  canvasSize = 800;
  center = 0;
  spongeSize = 300;
  createCanvas(canvasSize, canvasSize, WEBGL);
  mengerSponge = new  MengerSponge(spongeSize);
}

function increaseAngle() {
  angle += angle_change_rate;
  rotateX(angle);
  rotateY(angle);
}

function doubleClicked() {
	mengerSponge.split();
  return false;
}


function draw() {
	background(000);
	lights();
  mengerSponge.draw();
  orbitControl();
}