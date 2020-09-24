//define variables
var fruitChoice;
var apple_img;
var orange_img;
var peach_img;
var bomb_img;
var coconut_img;
var dragonfruit_img;
var papaya_img;
var pomogranate_img;
var fruits;
var bombs;
var tomato_img;
var watermelon_img;
var wood_img;

var score = 0;
var gamestate;
function preload(){
  //load in images
  apple_img = loadImage("apple.png");
  orange_img = loadImage("orange.png");
  peach_img = loadImage("peach.png");
  wood_img = loadImage("wood.png");
  bomb_img = loadImage("bomb.png");
  coconut_img = loadImage("coconut.png");
  dragonfruit_img = loadImage("dragonfruit.png");
  papaya_img = loadImage("papaya.png");
  pomogranate_img = loadImage("pomogranate.png");
  tomato_img = loadImage("tomato.png");
  watermelon_img = loadImage("watermelon.png");
}


function displayText(){
  //show how to play text
  if(gamestate === "waiting"){
     fill("black");
     textSize(40);
     text("Fruit Ninja", 115, 70);
     textSize(20);
     text("                         How to Play:\nHold down your mouse and drag to cut fruit\n                      Cut fruits for points\n                       Don't cut bombs!\n                          Hit P to start", 10, 200);
  }
  if(gamestate === "playing"){
     fill("black");
     textSize(20);
     text("Score: " + score, 15, 45);
  }
  
  if(gamestate === "over"){
     fill("black");
     textSize(40);
     text("Game Over!", 115, 70);
     textSize(20);
     text("       Final Score: " + score + "\n   Press R To Play Again", 100, 200);
  }
}

function changeGameState(){
  //switch to playing upon hitting P
  if(keyDown("P") && gamestate === "waiting"){
     gamestate = "playing";
  }
  if(keyDown("R") && gamestate === "over"){
     score = 0;
     gamestate = "waiting";
  }
}

function summonFruits(){
  //every 30 frames spawn a new fruit
  if(frameCount % 30 === 0){
     //create the fruit
     var fruit = createSprite(random(50,350), 450, 10, 10);
     fruit.setVelocity(random(-10.5,10.5), random(-7, -10.5));
     fruit.rotationSpeed = random(-8,8);
     fruit.scale =0.4;
     fruits.add(fruit);
     //1 = Pear, 2 = Orange, 3 = Lemon
     fruitChoice = Math.round(random(1,11)); 
     switch(fruitChoice){
       case 1: fruit.addImage("apple", apple_img);
       fruit.pause();
       break;
       case 2: fruit.addImage("orange", orange_img);
       fruit.pause();
       break;
       case 3: fruit.addImage("peach", peach_img);
       fruit.pause();
       break;
       case 4: fruit.addImage("coconut", coconut_img);
       fruit.pause();
       break;
       case 5: fruit.addImage("dragonfruit", dragonfruit_img);
       fruit.pause();
       break;
       case 6: fruit.addImage("papaya", papaya_img);
       fruit.pause();
       break;
       case 7: fruit.addImage("pomogranate", pomogranate_img);
       fruit.pause();
       break;
       case 8: fruit.addImage("tomato", tomato_img);
       fruit.pause();
       break;
       case 9: fruit.addImage("watermelon", watermelon_img);
       fruit.pause();
       break;
       
       default: break;
     }
     if(frameCount % 90 === 0){
     //create the bomb
     var bomb = createSprite(random(50,350), 450, 10, 10);
     bomb.setVelocity(random(-7.5,7.5), random(-10, -12.5));
     bomb.rotationSpeed = random(-8,8);
     bombs.add(bomb);
     bomb.scale = 0.25;
     //1 = Pear, 2 = Orange, 3 = Lemon
     bomb.addImage("bomb", bomb_img);
    }
  }
  //reduce fruit momentum
  for(var x = 0; x < fruits.length; x++){
    fruits.get(x).setVelocity(fruits.get(x).velocityX*0.97, fruits.get(x).velocityY + 0.1);
  }
  
  for(var x = 0; x < bombs.length; x++){
    bombs.get(x).setVelocity(bombs.get(x).velocityX*0.95, bombs.get(x).velocityY + 0.35);
  }
}

function cut(){
  //cut the fruits
  for(var c = 0; c < fruits.length; c++){
    if(mouseIsOver(fruits.get(c)) && mouseDown()){
      fruits.get(c).destroy();
      score+=5;
    }
  }
  
  for(var g = 0; g < fruits.length; g++){
    if(mouseIsOver(bombs.get(g)) && mouseDown()){
      bombs.get(g).destroy();
      gamestate = "over";
    }
  }
}


function setup() {
  //create canvas
  createCanvas(400, 400);
  
  //set variables
  gamestate = "waiting";
  
  //groups
  fruits = new Group();
  bombs = new Group()
}

function draw() {
  //set background
  background(wood_img);
  
  //draw sprites
  drawSprites();
  
  //display text
  displayText();
  
  //change game states
  changeGameState();
  
  //things that happen during gameplay
  if(gamestate === "playing"){
     //summon fruits
     summonFruits();
    
     //cut
    cut();
   }
}