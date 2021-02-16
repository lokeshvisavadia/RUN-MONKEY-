var PLAY =1;
var END=0;
var gameState=1;

var monkey , monkey_running,ground,sprite_0,monkey_collided;
var banana ,bananaImage,spawnBanana, obstacle, obstacleImage;
var FoodGroup, obstacleGroup,spawnObsacle;
var survivalTime=0;
var bananaCollected=0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_collid = loadAnimation("sprite_0.png");
  
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  
}



function setup() {
  createCanvas(650,250);

  monkey=createSprite(40,200,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
 obstacleGroup = createGroup();
  bananaGroup=createGroup();
  ground=createSprite(10,240,10000,20)
ground.shapeColor=("green");
  monkey.addAnimation("collid",monkey_collid);


}


function draw() {
  background(220);
  
  
  text("survival Time:" + survivalTime,100,50);
  text("Banana Collected:"+bananaCollected,200,50);
  
  if(gameState===PLAY){
    
    spawnObstacle();
  
    spawnBanana(); 
    
    if(keyDown("space")){
      monkey.velocityY=-10;
      
    }
    monkey.velocityY=monkey.velocityY+0.5;
    
    monkey.collide(ground); 
    
    if(monkey.isTouching(bananaGroup)){
      bananaCollected=bananaCollected+1;
      bananaGroup.destroyEach();
    }
    
    if(monkey.isTouching(obstacleGroup)){
      gameState=END;
    }
    survivalTime=Math.ceil(frameCount/frameRate());
    
    
  }else if (gameState===END){
    
obstacleGroup.setLifetimeEach(-1);
obstacleGroup.setVelocityXEach(0);
bananaGroup.setLifetimeEach(-1);
bananaGroup.setVelocityXEach(0);
monkey.collide(ground); 
monkey.changeAnimation("collid",monkey_collid);
survivalTime=survivalTime;
  monkey.velocityX=0;
  monkey.velocityY=0;
  }
  
  
  
  drawSprites();

}

function spawnObstacle(){
   if (frameCount % 99 === 0){
   
  
  obstacle=createSprite(550,203,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.15;
   obstacle.velocityX = -6 ;
     obstacle.lifetime=300;
     
   obstacleGroup.add(obstacle);
   
   }
}
function spawnBanana(){
 
  if (frameCount % 120 === 0){
  banana=createSprite(500,120,20,20);
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.velocityX=-6
bananaGroup.add(banana);
   
   
    
    
}
  
}



