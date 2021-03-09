var PLAY = 1;
var END = 0;
var gameState = 1;

var survivalTime;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, ground;
var survivalTime;

var ms;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  ms = loadImage("sprite_3.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
  FoodGroup= new Group();
  obstacleGroup= new Group();
  
}



function setup() {
  createCanvas(670, 400);
  score=0
  survivalTime=0
  
  ground=createSprite(0,400,1500,10)
  
   monkey=createSprite(90,370,10,10)
  monkey.addAnimation("monkey_running",monkey_running)
  monkey.addAnimation("ms",ms)
  monkey.scale=0.1
  
  
  

  }
function draw() {
  background("lightgreen")
  
 
    if(World.frameCount%200===0){
    fruits()
    }
    
     if(World.frameCount%300===0){
    stones()
    }

   if(monkey.isTouching(FoodGroup)){
     FoodGroup.destroyEach()
     score=score+1
      }
    
    ground.velocityX = -7 ;
    ground.x = ground.width/2;
    
      if(keyDown("space")&&monkey.y >= 350){
      monkey.velocityY=-10;
    }
    
    monkey.velocityY = monkey.velocityY + 0.3;
    monkey.collide(ground);
    
    
  
   if(gameState === 1){ 
    survivalTime=Math.ceil(frameCount/frameRate());
   }
    
    if(monkey.isTouching(obstacleGroup)){
      gameState = 0;
      gameOver();
    }
    
   
  

   fill("white") 
   text("Score: "+ score, 500,50);
  
   
   fill("black")
   text("Survival Time: "+ survivalTime,350,50);
  
 drawSprites();
  
}

function fruits(){
  banana=createSprite(670,Math.round(random(170,230)),10,10)
  banana.addImage(bananaImage)
  banana.scale=0.1
  banana.velocityX=-3
  FoodGroup.add(banana)
}

function stones(){
  obstacle=createSprite(670,380,10,10);
  obstacle.addImage(obstaceImage);
  obstacle.velocityX=-4;
  obstacle.scale=0.2;
  obstacleGroup.add(obstacle);
}

function gameOver(){
  monkey.velocityX = 0;
  obstacle.velocityX = 0;
  banana.velocityX = 0;
  monkey.velocityY = 0;
  ground.velocityX = 0;
  monkey.changeAnimation("ms",ms);
  
}





