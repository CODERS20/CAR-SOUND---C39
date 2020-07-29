var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var car1, car2;
var carSet = [];
var car1IMG, car2IMG, trackIMG;

var form, player, game;

function preload(){

   car2IMG = loadImage("images/car2.png");
   car1IMG = loadImage("images/car1.png");
   trackIMG = loadImage("images/track.jpg");
   vroomSound = loadSound("RACECAR.mp3");

}

function setup(){
  canvas = createCanvas(displayWidth,displayHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }

  if (gameState === 2){
     
    game.end();
    

  }

  
}
